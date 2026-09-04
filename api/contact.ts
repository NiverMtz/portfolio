import type { VercelRequest, VercelResponse } from '@vercel/node';

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

function safeParse(raw: string): Record<string, unknown> {
  try {
    return JSON.parse(raw) as Record<string, unknown>;
  } catch {
    return {};
  }
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse> {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const key = process.env['WEB3FORMS_KEY'];
  if (!key) {
    return res
      .status(500)
      .json({ success: false, message: 'Contact form not configured' });
  }

  const body =
    typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {});
  const name = String((body as Record<string, unknown>)['name'] ?? '').trim();
  const email = String((body as Record<string, unknown>)['email'] ?? '').trim();
  const message = String((body as Record<string, unknown>)['message'] ?? '').trim();
  const botcheck = String((body as Record<string, unknown>)['botcheck'] ?? '').trim();

  // Honeypot: un humano nunca llena este campo. Fingimos éxito y descartamos.
  if (botcheck) {
    return res.status(200).json({ success: true });
  }

  if (
    name.length < 2 ||
    name.length > 100 ||
    !isEmail(email) ||
    email.length > 150 ||
    message.length < 10 ||
    message.length > 5000
  ) {
    return res.status(422).json({ success: false, message: 'Invalid form data' });
  }

  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (Array.isArray(forwarded) ? forwarded[0] : forwarded)?.split(',')[0]?.trim() ||
    req.socket?.remoteAddress ||
    'unknown';
  if (tooManyRequests(ip)) {
    return res.status(429).json({ success: false, message: 'Too many requests' });
  }

  try {
    const upstream = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: key,
        subject: 'Nuevo mensaje desde nivermtz.dev',
        from_name: 'Portafolio Niver Mtz',
        name,
        email,
        message,
      }),
    });

    const data = (await upstream.json().catch(() => ({}))) as { success?: boolean };
    if (!upstream.ok || !data.success) {
      return res.status(502).json({ success: false, message: 'Upstream error' });
    }

    return res.status(200).json({ success: true });
  } catch {
    return res.status(502).json({ success: false, message: 'Upstream error' });
  }
}
