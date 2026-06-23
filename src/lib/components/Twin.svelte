<script>
  import { tick } from 'svelte';

  const GREETING =
    "Hi — I’m Phillip’s digital twin. Ask me anything about my career: my work at Capital One Shopping, founding Hallo, scaling AI/ML systems, or how I lead teams.";

  const suggestions = [
    'What do you do at Capital One Shopping?',
    'Tell me about founding Hallo',
    'What’s your experience with AI/ML?',
    'How do you approach leadership?'
  ];

  let open = $state(false);
  let busy = $state(false);
  let input = $state('');
  let errored = $state(false);
  let messages = $state([{ role: 'assistant', content: GREETING }]);

  let scroller = $state();
  let inputEl = $state();

  // Safety net: the model is told to avoid markdown, but strip stray emphasis
  // markers (**bold**, *italics*, __, leading #) so bubbles never show raw syntax.
  function clean(text) {
    return text
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/__(.*?)__/g, '$1')
      .replace(/(^|\s)\*(\S.*?\S)\*(?=\s|$)/g, '$1$2')
      .replace(/^#{1,6}\s+/gm, '');
  }

  // Only the greeting present → show suggestion chips.
  const showSuggestions = $derived(messages.length === 1 && !busy);

  async function scrollToBottom() {
    await tick();
    if (scroller) scroller.scrollTop = scroller.scrollHeight;
  }

  // Autoscroll as messages stream in.
  $effect(() => {
    // touch reactive deps
    messages.length;
    messages[messages.length - 1]?.content;
    scrollToBottom();
  });

  async function toggle() {
    open = !open;
    if (open) {
      await tick();
      inputEl?.focus();
    }
  }

  function onKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  function ask(text) {
    input = text;
    send();
  }

  async function send() {
    const text = input.trim();
    if (!text || busy) return;

    errored = false;
    input = '';
    messages.push({ role: 'user', content: text });
    busy = true;

    // Placeholder assistant message we stream into.
    const idx = messages.push({ role: 'assistant', content: '' }) - 1;

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: messages
            .slice(0, -1) // exclude the empty placeholder
            .map((m) => ({ role: m.role, content: m.content }))
        })
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status}).`);
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        messages[idx].content += decoder.decode(value, { stream: true });
      }

      if (!messages[idx].content) {
        messages[idx].content = 'Hmm — I didn’t catch that. Could you try rephrasing?';
      }
    } catch (err) {
      errored = true;
      messages[idx].content = `Sorry, I couldn’t reach the model just now (${err.message}) Please try again in a moment.`;
    } finally {
      busy = false;
      await tick();
      inputEl?.focus();
    }
  }

  // `busy` && last assistant message still empty → show typing dots.
  const thinking = $derived(
    busy && messages[messages.length - 1]?.role === 'assistant' && !messages[messages.length - 1]?.content
  );
</script>

<svelte:window
  onkeydown={(e) => {
    if (e.key === 'Escape' && open) open = false;
  }}
/>

<button class="launcher" class:hidden={open} onclick={toggle} aria-label="Open Phillip’s digital twin chat">
  <span class="avatar">P</span>
  <span class="launch-text">Ask my digital twin</span>
  <span class="ping" aria-hidden="true"></span>
</button>

{#if open}
  <div class="panel" role="dialog" aria-modal="false" aria-label="Chat with Phillip’s digital twin">
    <header class="panel-head">
      <span class="avatar lg">P</span>
      <div class="who">
        <strong>Phillip Bauman <span class="online" title="online"></span></strong>
        <span class="sub">Digital twin · ask about my career</span>
      </div>
      <button class="close" onclick={() => (open = false)} aria-label="Close chat">
        <svg viewBox="0 0 24 24" width="20" height="20"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
      </button>
    </header>

    <div class="messages" bind:this={scroller}>
      {#each messages as m}
        <div class="msg {m.role}">
          {#if m.role === 'assistant'}<span class="avatar sm">P</span>{/if}
          <div class="bubble">{m.role === 'assistant' ? clean(m.content) : m.content}</div>
        </div>
      {/each}

      {#if thinking}
        <div class="msg assistant">
          <span class="avatar sm">P</span>
          <div class="bubble typing"><span></span><span></span><span></span></div>
        </div>
      {/if}

      {#if showSuggestions}
        <div class="chips">
          {#each suggestions as s}
            <button class="chip" onclick={() => ask(s)}>{s}</button>
          {/each}
        </div>
      {/if}
    </div>

    <div class="composer">
      <textarea
        bind:this={inputEl}
        bind:value={input}
        onkeydown={onKey}
        rows="1"
        placeholder="Ask about my experience…"
        aria-label="Message"
      ></textarea>
      <button class="send" onclick={send} disabled={busy || !input.trim()} aria-label="Send">
        <svg viewBox="0 0 24 24" width="18" height="18"><path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>
      </button>
    </div>
    <p class="disclaimer">AI digital twin · responses are generated and may simplify details.</p>
  </div>
{/if}

<style>
  .avatar {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(145deg, var(--accent), #8f4527);
    color: #fff;
    font-weight: 600;
    font-size: 0.82rem;
    letter-spacing: -0.02em;
  }
  .avatar.lg {
    width: 38px;
    height: 38px;
    font-size: 1.05rem;
  }
  .avatar.sm {
    width: 24px;
    height: 24px;
    font-size: 0.72rem;
    margin-top: 2px;
  }

  /* Launcher */
  .launcher {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 60;
    display: inline-flex;
    align-items: center;
    gap: 0.65rem;
    padding: 0.5rem 1.1rem 0.5rem 0.5rem;
    background: var(--cream);
    color: var(--ink);
    border: none;
    border-radius: 100px;
    font-family: var(--sans);
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
    transition: transform 0.4s var(--ease), box-shadow 0.4s var(--ease), opacity 0.3s var(--ease);
    animation: rise 0.6s var(--ease) both 0.4s;
  }
  .launcher:hover {
    transform: translateY(-3px);
    box-shadow: 0 16px 50px rgba(0, 0, 0, 0.55);
  }
  .launcher.hidden {
    opacity: 0;
    pointer-events: none;
    transform: translateY(10px) scale(0.96);
  }
  .ping {
    position: absolute;
    top: 6px;
    left: 30px;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    background: #46c46a;
    box-shadow: 0 0 0 2px var(--cream);
  }
  .ping::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: #46c46a;
    animation: ping 2s var(--ease) infinite;
  }
  @keyframes ping {
    0% { transform: scale(1); opacity: 0.7; }
    70%, 100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes rise {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: none; }
  }

  /* Panel */
  .panel {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    z-index: 61;
    width: min(420px, calc(100vw - 2rem));
    height: min(640px, calc(100vh - 2rem));
    display: flex;
    flex-direction: column;
    background: #141416;
    border: 1px solid var(--ink-line);
    border-radius: 20px;
    overflow: hidden;
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
    transform-origin: bottom right;
    animation: pop 0.45s var(--ease) both;
  }
  @keyframes pop {
    from { opacity: 0; transform: translateY(16px) scale(0.96); }
    to { opacity: 1; transform: none; }
  }

  .panel-head {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    padding: 1rem 1.1rem;
    border-bottom: 1px solid var(--ink-line);
    background: linear-gradient(180deg, rgba(194, 104, 63, 0.08), transparent);
  }
  .who {
    display: flex;
    flex-direction: column;
    line-height: 1.25;
    margin-right: auto;
  }
  .who strong {
    font-size: 0.98rem;
    font-weight: 600;
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
  }
  .online {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #46c46a;
  }
  .who .sub {
    font-size: 0.76rem;
    color: var(--on-dark-muted);
  }
  .close {
    background: none;
    border: none;
    color: var(--on-dark-muted);
    cursor: pointer;
    padding: 4px;
    border-radius: 8px;
    transition: color 0.3s var(--ease), background 0.3s var(--ease);
  }
  .close:hover {
    color: var(--on-dark);
    background: rgba(255, 255, 255, 0.06);
  }

  .messages {
    flex: 1;
    overflow-y: auto;
    padding: 1.2rem 1.1rem;
    display: flex;
    flex-direction: column;
    gap: 0.9rem;
    scrollbar-width: thin;
    scrollbar-color: rgba(255, 255, 255, 0.18) transparent;
  }

  .msg {
    display: flex;
    gap: 0.55rem;
    max-width: 92%;
  }
  .msg.user {
    align-self: flex-end;
    flex-direction: row-reverse;
  }
  .bubble {
    font-size: 0.92rem;
    line-height: 1.5;
    padding: 0.7rem 0.9rem;
    border-radius: 14px;
    white-space: pre-wrap;
    word-break: break-word;
  }
  .msg.assistant .bubble {
    background: rgba(255, 255, 255, 0.05);
    color: var(--on-dark);
    border-bottom-left-radius: 4px;
  }
  .msg.user .bubble {
    background: var(--accent);
    color: #fff;
    border-bottom-right-radius: 4px;
  }

  .typing {
    display: inline-flex;
    gap: 4px;
    align-items: center;
  }
  .typing span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--on-dark-muted);
    animation: blink 1.3s infinite both;
  }
  .typing span:nth-child(2) { animation-delay: 0.2s; }
  .typing span:nth-child(3) { animation-delay: 0.4s; }
  @keyframes blink {
    0%, 80%, 100% { opacity: 0.25; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-3px); }
  }

  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 0.3rem;
  }
  .chip {
    font-family: var(--sans);
    font-size: 0.82rem;
    color: var(--on-dark);
    background: transparent;
    border: 1px solid var(--ink-line);
    border-radius: 100px;
    padding: 0.45rem 0.85rem;
    cursor: pointer;
    text-align: left;
    transition: border-color 0.3s var(--ease), background 0.3s var(--ease);
  }
  .chip:hover {
    border-color: var(--accent);
    background: var(--accent-soft);
  }

  .composer {
    display: flex;
    align-items: flex-end;
    gap: 0.5rem;
    padding: 0.7rem 0.8rem 0.4rem;
    border-top: 1px solid var(--ink-line);
  }
  textarea {
    flex: 1;
    resize: none;
    max-height: 120px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid var(--ink-line);
    border-radius: 12px;
    color: var(--on-dark);
    font-family: var(--sans);
    font-size: 0.92rem;
    line-height: 1.45;
    padding: 0.6rem 0.8rem;
    outline: none;
    transition: border-color 0.3s var(--ease);
  }
  textarea:focus {
    border-color: var(--accent);
  }
  textarea::placeholder {
    color: var(--on-dark-faint);
  }
  .send {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    display: grid;
    place-items: center;
    background: var(--accent);
    color: #fff;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    transition: transform 0.3s var(--ease), opacity 0.3s var(--ease), background 0.3s var(--ease);
  }
  .send:hover:not(:disabled) {
    transform: translateY(-2px);
  }
  .send:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  .disclaimer {
    text-align: center;
    font-size: 0.68rem;
    color: var(--on-dark-faint);
    padding: 0.2rem 1rem 0.7rem;
  }

  @media (max-width: 520px) {
    .panel {
      bottom: 0;
      right: 0;
      width: 100vw;
      height: 100svh;
      border-radius: 0;
    }
    .launcher .launch-text {
      display: none;
    }
    .launcher {
      padding: 0.5rem;
    }
  }
</style>
