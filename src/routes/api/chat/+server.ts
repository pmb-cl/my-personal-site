// SvelteKit endpoint: POST /api/chat — proxies to OpenRouter and streams the
// assistant's reply back as plain text. The API key stays server-side and this
// route ships to production via the adapter (unlike a dev-only Vite plugin).

import { env } from '$env/dynamic/private';
import { json } from '@sveltejs/kit';
import { buildSystemPrompt } from '$lib/twin-context.js';

const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions';
const MODEL = 'nvidia/nemotron-3-ultra-550b-a55b:free';
const MAX_HISTORY = 12; // cap conversation turns sent upstream

export async function POST({ request }) {
  const apiKey = env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return json(
      { error: 'Server is missing OPENROUTER_API_KEY. Add it to .env and restart.' },
      { status: 500 }
    );
  }

  let history;
  try {
    const parsed = await request.json();
    history = Array.isArray(parsed?.messages) ? parsed.messages : null;
    if (!history) throw new Error('`messages` must be an array');
  } catch (err: any) {
    return json({ error: `Invalid request: ${err.message}` }, { status: 400 });
  }

  // Sanitize + cap the conversation we forward upstream.
  const trimmed = history
    .filter(
      (m: any) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string'
    )
    .slice(-MAX_HISTORY)
    .map((m: any) => ({ role: m.role, content: m.content.slice(0, 4000) }));

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
  } catch (err: any) {
    return json({ error: `Could not reach OpenRouter: ${err.message}` }, { status: 502 });
  }

  if (!upstream.ok || !upstream.body) {
    const detail = await upstream.text().catch(() => '');
    return json(
      { error: `OpenRouter error (${upstream.status}). ${detail.slice(0, 300)}` },
      { status: 502 }
    );
  }

  // Transform OpenRouter's SSE stream into plain text deltas for the client.
  const stream = new ReadableStream({
    async start(controller) {
      const reader = upstream.body?.getReader();
      const decoder = new TextDecoder();
      const encoder = new TextEncoder();
      let buffer = '';
      let sentAnything = false;

      try {
        if(!reader) {
          throw new Error("reader not defined");
        }
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
              const data = JSON.parse(payload);
              const delta = data.choices?.[0]?.delta?.content;
              if (delta) {
                controller.enqueue(encoder.encode(delta));
                sentAnything = true;
              }
            } catch {
              // ignore keep-alive comments / partial JSON
            }
          }
        }
      } catch (err: any) {
        if (!sentAnything) {
          controller.enqueue(encoder.encode(`⚠️ The connection dropped: ${err.message}`));
        }
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'no-cache, no-transform',
      'X-Accel-Buffering': 'no'
    }
  });
}
