<script>
  import { expertise } from '../data.js';
  import { inview } from '../actions.js';
</script>

<section id="expertise" class="section expertise">
  <div class="container">
    <div class="head">
      <span class="eyebrow reveal" use:inview>03 — Expertise</span>
      <h2 class="display title reveal" use:inview style="--reveal-delay:60ms">
        From the org chart <br />to the <em class="serif italic">infrastructure.</em>
      </h2>
    </div>

    <div class="grid">
      {#each expertise as group, i}
        <div class="col reveal" use:inview style="--reveal-delay:{i * 90}ms">
          <h3 class="col-title">
            <span class="num">0{i + 1}</span>
            {group.title}
          </h3>
          <ul>
            {#each group.items as item}
              <li>{item}</li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  .head {
    margin-bottom: clamp(3.5rem, 7vw, 5.5rem);
  }
  .head .eyebrow {
    color: var(--on-dark-faint);
    display: block;
    margin-bottom: 1.2rem;
  }
  .title {
    font-size: clamp(2.2rem, 6vw, 4.6rem);
    letter-spacing: -0.04em;
  }
  .title em {
    color: var(--accent);
  }

  .grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: clamp(1.5rem, 3vw, 2.5rem);
  }

  .col {
    border-top: 1px solid var(--ink-line);
    padding-top: 1.6rem;
  }
  .col-title {
    display: flex;
    align-items: baseline;
    gap: 0.6rem;
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: -0.02em;
    margin-bottom: 1.6rem;
  }
  .num {
    font-family: var(--mono);
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.1em;
  }

  ul {
    list-style: none;
    display: grid;
    gap: 0.85rem;
  }
  li {
    color: var(--on-dark-muted);
    font-size: 0.98rem;
    line-height: 1.4;
    padding-bottom: 0.85rem;
    border-bottom: 1px solid var(--ink-line);
    transition: color 0.3s var(--ease), padding-left 0.3s var(--ease);
  }
  li:hover {
    color: var(--on-dark);
    padding-left: 0.4rem;
  }
  li:last-child {
    border-bottom: none;
  }

  @media (max-width: 980px) {
    .grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 2.5rem 2rem;
    }
  }
  @media (max-width: 520px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
</style>
