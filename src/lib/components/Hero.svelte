<script>
  import { onMount } from 'svelte';
  import { profile } from '../data.js';

  let mounted = $state(false);
  onMount(() => {
    requestAnimationFrame(() => (mounted = true));
  });
</script>

<section id="top" class="hero">
  <div class="glow"></div>

  <div class="container inner">
    <div class="top-row" class:in={mounted}>
      <span class="eyebrow">Engineering Leadership</span>
      <span class="eyebrow muted">AI/ML · Ad Tech · Scale</span>
    </div>

    <h1 class="display headline" class:in={mounted}>
      <span class="clip-line" style="--reveal-delay:120ms"><span>I build</span></span>
      <span class="clip-line" style="--reveal-delay:220ms"
        ><span><em class="serif italic">large-scale</em> systems</span></span
      >
      <span class="clip-line" style="--reveal-delay:320ms"><span>— and the teams</span></span>
      <span class="clip-line" style="--reveal-delay:420ms"><span>behind them.</span></span>
    </h1>

    <div class="meta" class:in={mounted}>
      <p class="lede">
        Technical executive with a decade of experience architecting distributed,
        AI-powered marketing and ad-tech platforms — at Fortune 100 scale and from
        zero to one.
      </p>
      <div class="actions">
        <a class="primary" href="#journey">
          View career journey
          <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
        <a class="ghost" href={profile.resume} target="_blank" rel="noopener">Download résumé</a>
      </div>
    </div>
  </div>

  <a class="scroll-cue" href="#about" class:in={mounted} aria-label="Scroll down">
    <span>Scroll</span>
    <span class="line"></span>
  </a>
</section>

<style>
  .hero {
    position: relative;
    min-height: 100svh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 76px;
    overflow: hidden;
  }

  .glow {
    position: absolute;
    top: -20%;
    right: -10%;
    width: 70vw;
    height: 70vw;
    max-width: 900px;
    max-height: 900px;
    background: radial-gradient(
      circle,
      rgba(194, 104, 63, 0.16) 0%,
      rgba(194, 104, 63, 0.04) 38%,
      transparent 68%
    );
    pointer-events: none;
    filter: blur(8px);
  }

  .inner {
    position: relative;
    z-index: 1;
    padding-block: clamp(3rem, 8vh, 7rem);
  }

  .top-row {
    display: flex;
    align-items: center;
    gap: 1.25rem;
    margin-bottom: clamp(1.75rem, 4vw, 3rem);
    opacity: 0;
    transform: translateY(16px);
    transition: opacity 0.8s var(--ease), transform 0.8s var(--ease);
    transition-delay: 0.05s;
  }
  .top-row.in {
    opacity: 1;
    transform: none;
  }
  .top-row .muted {
    color: var(--on-dark-muted);
  }
  .top-row .muted::before {
    content: '';
    display: inline-block;
    width: 28px;
    height: 1px;
    background: var(--on-dark-faint);
    vertical-align: middle;
    margin-right: 1.25rem;
  }

  .headline {
    font-size: clamp(2.9rem, 9.5vw, 8.4rem);
    max-width: 16ch;
  }
  .headline em {
    font-size: 1.04em;
    color: var(--accent);
    padding-right: 0.05em;
  }
  /* Drive the clip-line reveals from the mount state instead of scroll. */
  .headline.in :global(.clip-line > span) {
    transform: none;
  }

  .meta {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    justify-content: space-between;
    gap: 2rem;
    margin-top: clamp(2.5rem, 6vw, 4.5rem);
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.9s var(--ease), transform 0.9s var(--ease);
    transition-delay: 0.65s;
  }
  .meta.in {
    opacity: 1;
    transform: none;
  }

  .lede {
    max-width: 44ch;
    color: var(--on-dark-muted);
    font-size: clamp(1rem, 1.5vw, 1.18rem);
    line-height: 1.55;
  }

  .actions {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    flex-shrink: 0;
  }

  .primary {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    background: var(--cream);
    color: var(--ink);
    font-weight: 500;
    font-size: 0.98rem;
    padding: 0.85rem 1.4rem;
    border-radius: 100px;
    transition: transform 0.4s var(--ease), background 0.3s var(--ease);
  }
  .primary svg {
    transition: transform 0.4s var(--ease);
  }
  .primary:hover {
    background: #fff;
    transform: translateY(-2px);
  }
  .primary:hover svg {
    transform: translateX(4px);
  }

  .ghost {
    font-size: 0.98rem;
    color: var(--on-dark-muted);
    border-bottom: 1px solid var(--ink-line);
    padding-bottom: 3px;
    transition: color 0.3s var(--ease), border-color 0.3s var(--ease);
  }
  .ghost:hover {
    color: var(--on-dark);
    border-color: var(--on-dark);
  }

  .scroll-cue {
    position: absolute;
    bottom: 2.2rem;
    left: 50%;
    transform: translateX(-50%) translateY(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.7rem;
    font-family: var(--mono);
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--on-dark-faint);
    opacity: 0;
    transition: opacity 1s var(--ease) 1s, transform 1s var(--ease) 1s;
  }
  .scroll-cue.in {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  .scroll-cue .line {
    width: 1px;
    height: 42px;
    background: linear-gradient(var(--on-dark-faint), transparent);
    position: relative;
    overflow: hidden;
  }
  .scroll-cue .line::after {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--accent);
    animation: cue 2.2s var(--ease) infinite;
  }
  @keyframes cue {
    0% { transform: translateY(-100%); }
    60%, 100% { transform: translateY(100%); }
  }

  @media (max-width: 860px) {
    .scroll-cue {
      display: none;
    }
    .meta {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
