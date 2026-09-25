// Кіру кодын тексеретін Vercel serverless функциясы.
// Кодтар тізімі тек серверде — Vercel environment variable ACCESS_CODES ішінде сақталады.
// Формат: кодтар үтір (немесе жаңа жол / бос орын) арқылы бөлінеді, мысалы:
//   ASSILA-2024-XXXX,ASSILA-2024-YYYY
const crypto = require('crypto');

// Қарапайым қорғаныс: бір IP-ден қысқа уақытта тым көп әрекет жасауға болмайды.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 20;
const attempts = new Map();

function normalize(code) {
  return String(code || '').trim().toUpperCase();
}

function loadCodes() {
  return String(process.env.ACCESS_CODES || '')
    .split(/[\s,;]+/)
    .map(normalize)
    .filter(Boolean);
}

function sha256(s) {
  return crypto.createHash('sha256').update(s).digest();
}

// Уақыт бойынша тең салыстыру (timing attack-тан қорғау)
function isValid(code, codes) {
  const h = sha256(code);
  let ok = false;
  for (const c of codes) {
    if (crypto.timingSafeEqual(h, sha256(c))) ok = true;
  }
  return ok;
}

function tooManyAttempts(ip) {
  const now = Date.now();
  const rec = attempts.get(ip);
  if (!rec || now - rec.start > WINDOW_MS) {
    attempts.set(ip, { start: now, count: 1 });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_ATTEMPTS;
}

async function readBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch (e) { return {}; }
  }
  return new Promise(function (resolve) {
    let data = '';
    req.on('data', function (chunk) {
      data += chunk;
      if (data.length > 10000) req.destroy();
    });
    req.on('end', function () {
      try { resolve(JSON.parse(data || '{}')); } catch (e) { resolve({}); }
    });
    req.on('error', function () { resolve({}); });
  });
}

function send(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(obj));
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { ok: false, error: 'method' });
  }

  const ip = String(req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
    (req.socket && req.socket.remoteAddress) || 'unknown';
  if (tooManyAttempts(ip)) {
    return send(res, 429, { ok: false, error: 'rate' });
  }

  const codes = loadCodes();
  if (codes.length === 0) {
    // ACCESS_CODES орнатылмаған — Vercel баптауларын тексеру керек
    return send(res, 500, { ok: false, error: 'config' });
  }

  const body = await readBody(req);
  const code = normalize(body && body.code);
  if (!code || code.length > 64) {
    return send(res, 400, { ok: false, error: 'empty' });
  }

  if (isValid(code, codes)) {
    return send(res, 200, { ok: true });
  }
  // Кодты іріктеп табуды баяулату
  await new Promise(function (r) { setTimeout(r, 400); });
  return send(res, 200, { ok: false, error: 'invalid' });
};
