<script>
  import { profile } from '../data.js';
  import { inview } from '../actions.js';
</script>

<section id="contact" class="section contact">
  <div class="container">
    <span class="eyebrow reveal" use:inview>04 — Contact</span>

    <h2 class="display title reveal" use:inview style="--reveal-delay:60ms">
      Let’s build <br /><em class="serif italic">something</em> together.
    </h2>

    <a class="mailto reveal" href="mailto:{profile.email}" use:inview style="--reveal-delay:140ms">
      {profile.email}
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M7 17L17 7M17 7H8M17 7V16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </a>

    <div class="rows reveal" use:inview style="--reveal-delay:220ms">
      <div class="row">
        <span class="k">LinkedIn</span>
        <a class="v" href={profile.linkedin} target="_blank" rel="noopener">/in/phillip-bauman</a>
      </div>
      <div class="row">
        <span class="k">Résumé</span>
        <a class="v" href={profile.resume} target="_blank" rel="noopener">Download PDF</a>
      </div>
      <div class="row">
        <span class="k">Based in</span>
        <span class="v plain">{profile.location}</span>
      </div>
    </div>
  </div>
</section>

<style>
  .contact {
    background: var(--cream);
    color: var(--on-light);
    padding-block: clamp(6rem, 14vw, 13rem);
  }
  .eyebrow {
    color: var(--on-light-faint);
    display: block;
    margin-bottom: clamp(1.5rem, 4vw, 2.5rem);
  }

  .title {
    font-size: clamp(2.8rem, 11vw, 9rem);
    letter-spacing: -0.045em;
    color: var(--on-light);
    line-height: 0.95;
  }
  .title em {
    color: var(--accent);
  }

  .mailto {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: clamp(2.5rem, 5vw, 4rem);
    font-size: clamp(1.4rem, 4vw, 2.6rem);
    font-weight: 500;
    letter-spacing: -0.03em;
    color: var(--on-light);
    border-bottom: 1px solid var(--paper-line);
    padding-bottom: 0.4rem;
    transition: color 0.35s var(--ease), border-color 0.35s var(--ease);
    word-break: break-all;
  }
  .mailto svg {
    flex-shrink: 0;
    transition: transform 0.4s var(--ease);
  }
  .mailto:hover {
    color: var(--accent);
    border-color: var(--accent);
  }
  .mailto:hover svg {
    transform: translate(4px, -4px);
  }

  .rows {
    margin-top: clamp(3rem, 6vw, 5rem);
    display: grid;
    gap: 0;
    max-width: 560px;
  }
  .row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding-block: 1.1rem;
    border-top: 1px solid var(--paper-line);
  }
  .row:last-child {
    border-bottom: 1px solid var(--paper-line);
  }
  .k {
    font-family: var(--mono);
    font-size: 0.74rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: var(--on-light-faint);
  }
  .v {
    font-size: 1.08rem;
    color: var(--on-light);
    position: relative;
  }
  a.v::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -3px;
    width: 100%;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.4s var(--ease);
  }
  a.v:hover::after {
    transform: scaleX(1);
    transform-origin: left;
  }
  .v.plain {
    color: var(--on-light-muted);
  }
</style>
