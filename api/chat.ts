// Vercel Serverless Function (runtime Node).
// Proxy hacia la API de Anthropic (Claude) para el chatbot del portafolio.
//
// Sin dependencias externas: se llama a la API con `fetch` y se tipan req/res de
// forma estructural, igual que en `api/contact.ts`.
//
// Requiere la variable de entorno ANTHROPIC_API_KEY (Environment Variable en
// Vercel, no en el repo). Conviene fijar un límite de gasto mensual en
// https://console.anthropic.com para acotar el costo.

import { SYSTEM_PROMPT } from './_knowledge';

interface Req {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
  socket?: { remoteAddress?: string };
}

interface Res {
  status(code: number): Res;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
}

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const MODEL = 'claude-haiku-4-5';
const MAX_TOKENS = 512;
const MAX_MESSAGES = 12; // turnos aceptados por petición (usuario + asistente)
const MAX_CHARS = 1500; // por mensaje del visitante

// Límite best-effort por instancia caliente: 15 mensajes / 10 min por IP.
const RATE_LIMIT = 15;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
}

function sanitizeMessages(raw: unknown): ChatMessage[] {
  if (!Array.isArray(raw)) return [];

  const parsed: ChatMessage[] = [];
  for (const item of raw) {
    const rec = asRecord(item);
    const role = rec['role'];
    const content =
      typeof rec['content'] === 'string' ? rec['content'].trim() : '';
    if ((role === 'user' || role === 'assistant') && content) {
      parsed.push({ role, content: content.slice(0, MAX_CHARS) });
    }
  }

  // Nos quedamos con los últimos turnos y garantizamos que empiece en 'user'.
  const trimmed = parsed.slice(-MAX_MESSAGES);
  while (trimmed.length && trimmed[0].role !== 'user') {
    trimmed.shift();
  }
  return trimmed;
}

export default async function handler(req: Req, res: Res): Promise<void> {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    const apiKey = process.env['ANTHROPIC_API_KEY'];
    if (!apiKey) {
      console.error('[chat] ANTHROPIC_API_KEY no está configurada');
      res.status(500).json({ success: false, message: 'Chat not configured' });
      return;
    }

    let raw: unknown = req.body;
    if (typeof raw === 'string') {
      try {
        raw = JSON.parse(raw);
      } catch {
        raw = {};
      }
    }

    const messages = sanitizeMessages(asRecord(raw)['messages']);
    if (!messages.length || messages[messages.length - 1].role !== 'user') {
      res.status(422).json({ success: false, message: 'Invalid conversation' });
      return;
    }

    const forwarded = req.headers['x-forwarded-for'];
    const ip =
      (Array.isArray(forwarded) ? forwarded[0] : forwarded)
        ?.split(',')[0]
        ?.trim() ||
      req.socket?.remoteAddress ||
      'unknown';
    if (tooManyRequests(ip)) {
      res.status(429).json({ success: false, message: 'Too many requests' });
      return;
    }

    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: [
          {
            type: 'text',
            text: SYSTEM_PROMPT,
            cache_control: { type: 'ephemeral' },
          },
        ],
        messages,
      }),
    });

    if (!upstream.ok) {
      const detail = await upstream.text().catch(() => '');
      console.error('[chat] Anthropic error', upstream.status, detail);
      res.status(502).json({ success: false, message: 'Upstream error' });
      return;
    }

    const data = (await upstream.json().catch(() => ({}))) as {
      content?: Array<{ type?: string; text?: string }>;
    };

    const reply = (data.content ?? [])
      .filter((b) => b.type === 'text' && typeof b.text === 'string')
      .map((b) => b.text as string)
      .join('\n')
      .trim();

    if (!reply) {
      console.error('[chat] Respuesta vacía de Anthropic', data);
      res.status(502).json({ success: false, message: 'Empty response' });
      return;
    }

    res.status(200).json({ success: true, reply });
  } catch (err) {
    console.error('[chat] Fallo inesperado:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
}
