// Vercel Serverless Function (runtime Node).
// Sin dependencias externas: req/res se tipan de forma estructural para que
// nada del tsconfig de Angular ni de @vercel/node pueda romper el bundle.

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

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

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
    const hasKey = Boolean(process.env['WEB3FORMS_KEY']);

    // Diagnóstico: abrir la URL en el navegador (GET) confirma que la función
    // corre y si la variable de entorno llega. No expone la key.
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      res
        .status(req.method === 'GET' ? 200 : 405)
        .json({ ok: true, method: req.method ?? 'UNKNOWN', hasKey });
      return;
    }

    const key = process.env['WEB3FORMS_KEY'];
    if (!key) {
      console.error('[contact] WEB3FORMS_KEY no está configurada');
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

    // api.web3forms.com está detrás de Cloudflare Bot Management: rechaza (403)
    // las peticiones servidor-a-servidor que no parecen un navegador real.
    // Este set de headers hace que el challenge de Cloudflare deje pasar.
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json, text/plain, */*',
        'Accept-Language': 'es-ES,es;q=0.9,en;q=0.8',
        Origin: 'https://nivermtz.dev',
        Referer: 'https://nivermtz.dev/',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 ' +
          '(KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'sec-ch-ua':
          '"Chromium";v="131", "Not_A Brand";v="24", "Google Chrome";v="131"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"Windows"',
      },
      body: JSON.stringify({
        access_key: key,
        subject: 'Nuevo mensaje desde nivermtz.dev',
        from_name: 'Portafolio Niver Mtz',
        name,
        email,
        message,
      }),
    });

    const data = (await upstream.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };

    if (!upstream.ok || !data.success) {
      console.error('[contact] Web3Forms error', upstream.status, data);
      res.status(502).json({
        success: false,
        message: 'Upstream error',
        // Diagnóstico temporal: qué respondió Web3Forms. Quitar cuando funcione.
        upstreamStatus: upstream.status,
        upstreamMessage: data.message ?? null,
      });
      return;
    }

    res.status(200).json({ success: true });
  } catch (err) {
    console.error('[contact] Fallo inesperado:', err);
    res.status(500).json({ success: false, message: 'Internal error' });
  }
}
