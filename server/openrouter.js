// Vite plugin: a server-side /api/chat endpoint that proxies to OpenRouter.
// The API key never reaches the browser. Works in both `dev` and `preview`.

import { buildSystemPrompt } from '../src/lib/twin-context.js';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';
const MAX_HISTORY = 12; // cap conversation turns sent upstream

function readBody(req) {
  return new Promise((resolve, reject) => {
    let data = '';
    let size = 0;
    req.on('data', (chunk) => {
      size += chunk.length;
      if (size > 1_000_000) reject(new Error('Payload too large'));
      data += chunk;
    });
    req.on('end', () => resolve(data));
    req.on('error', reject);
  });
}

function sendJson(res, status, obj) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(obj));
}

function makeHandler(apiKey) {
  return async (req, res) => {
    if (req.method !== 'POST') {
      return sendJson(res, 405, { error: 'Method not allowed' });
    }
    if (!apiKey) {
      return sendJson(res, 500, {
        error: 'Server is missing OPENROUTER_API_KEY. Add it to .env and restart.'
      });
    }

    let history;
    try {
      const raw = await readBody(req);
      const parsed = JSON.parse(raw || '{}');
      history = Array.isArray(parsed.messages) ? parsed.messages : null;
      if (!history) throw new Error('`messages` must be an array');
    } catch (err) {
      return sendJson(res, 400, { error: `Invalid request: ${err.message}` });
    }

    // Sanitize + cap the conversation we forward upstream.
    const trimmed = history
      .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .slice(-MAX_HISTORY)
      .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

    const messages = [{ role: 'system', content: buildSystemPrompt() }, ...trimmed];

    let upstream;
    try {
      upstream = await fetch(OPENROUTER_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Phillip Bauman - Digital Twin'
        },
        body: JSON.stringify({
          model: MODEL,
          messages,
          stream: true,
          max_tokens: 1024,
          temperature: 0.35,
          reasoning: { exclude: true } // model reasons internally; we only stream the answer
        })
      });
    } catch (err) {
      return sendJson(res, 502, { error: `Could not reach OpenRouter: ${err.message}` });
    }

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => '');
      return sendJson(res, 502, {
        error: `OpenRouter error (${upstream.status}). ${detail.slice(0, 300)}`
      });
    }

    // Stream the assistant's answer to the client as plain text chunks.
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Cache-Control', 'no-cache, no-transform');
    res.setHeader('X-Accel-Buffering', 'no');

    const reader = upstream.body.getReader();
    const decoder = new TextDecoder();
    let buffer = '';
    let sentAnything = false;

    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        // Parse Server-Sent Events: lines beginning with "data: ".
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? ''; // keep the trailing partial line

        for (const line of lines) {
          const trimmedLine = line.trim();
          if (!trimmedLine.startsWith('data:')) continue;
          const payload = trimmedLine.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const json = JSON.parse(payload);
            const delta = json.choices?.[0]?.delta?.content;
            if (delta) {
              res.write(delta);
              sentAnything = true;
            }
          } catch {
            // ignore keep-alive comments / partial JSON
          }
        }
      }
    } catch (err) {
      if (!sentAnything) {
        res.write(`⚠️ The connection dropped: ${err.message}`);
      }
    }

    res.end();
  };
}

export function openrouterChat(apiKey) {
  const handler = makeHandler(apiKey);
  // Note: must NOT return the value of `.use()` (the Connect app) — Vite would
  // treat a returned function as a post-hook and invoke it as middleware.
  const attach = (server) => {
    server.middlewares.use('/api/chat', handler);
  };
  return {
    name: 'openrouter-chat',
    configureServer: attach,
    configurePreviewServer: attach
  };
}
