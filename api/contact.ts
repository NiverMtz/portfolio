// Vercel Serverless Function (runtime Node).
// Sin dependencias externas: req/res se tipan de forma estructural para que
// nada del tsconfig de Angular ni de @vercel/node pueda romper el bundle.
//
// Reenvía a Formspree. El endpoint (https://formspree.io/f/XXXXXXXX) se guarda
// como variable de entorno FORMSPREE_ENDPOINT en Vercel, no en el repo.

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

// Límite best-effort por instancia caliente: 5 envíos / 10 min por IP.
const RATE_LIMIT = 5;
const WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

function tooManyRequests(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > RATE_LIMIT;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === 'object'
    ? (value as Record<string, unknown>)
    : {};
}

export default async function handler(req: Req, res: Res): Promise<void> {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res.status(405).json({ success: false, message: 'Method not allowed' });
      return;
    }

    const endpoint = process.env['FORMSPREE_ENDPOINT'];
    if (!endpoint) {
      console.error('[contact] FORMSPREE_ENDPOINT no está configurado');
      res
        .status(500)
        .json({ success: false, message: 'Contact form not configured' });
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

    const body = asRecord(raw);
    const name = String(body['name'] ?? '').trim();
    const email = String(body['email'] ?? '').trim();
    const message = String(body['message'] ?? '').trim();
    const botcheck = String(body['botcheck'] ?? '').trim();

    // Honeypot: un humano nunca llena este campo. Fingimos éxito y descartamos.
    if (botcheck) {
      res.status(200).json({ success: true });
      return;
    }

    if (
      name.length < 2 ||
      name.length > 100 ||
      !isEmail(email) ||
      email.length > 150 ||
      message.length < 10 ||
      message.length > 5000
    ) {
      res.status(422).json({ success: false, message: 'Invalid form data' });
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

    const upstream = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `Nuevo mensaje desde nivermtz.dev — ${name}`,
        _replyto: email,
      }),
    });

    const data = (await upstream.json().catch(() => ({}))) as {
      ok?: boolean;
      error?: string;
      errors?: Array<{ message?: string }>;
    };

    if (!upstream.ok || data.ok === false) {
      const detail =
        data.error ?? data.errors?.map((e) => e.message).join('; ') ?? null;
      console.error('[contact] Formspree error', upstream.status, detail, data);
      res.status(502).json({ success: false, message: 'Upstream error' });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] Fallo inesperado:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
}
