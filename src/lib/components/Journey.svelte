<script>
  import { journey } from '../data.js';
  import { inview } from '../actions.js';
</script>

<section id="journey" class="section journey">
  <div class="container">
    <div class="head">
      <span class="eyebrow reveal" use:inview>02 — Career Journey</span>
      <h2 class="display title reveal" use:inview style="--reveal-delay:60ms">
        A decade of building, <br /><em class="serif italic">leading</em>, and scaling.
      </h2>
    </div>

    <ol class="timeline">
      {#each journey as job, i}
        <li class="entry reveal" use:inview style="--reveal-delay:{i * 60}ms">
          <div class="rail" aria-hidden="true">
            <span class="node"></span>
          </div>

          <div class="when">
            <span class="period">{job.period}</span>
            <span class="place">{job.place}</span>
          </div>

          <div class="what">
            <h3 class="role">{job.role}</h3>
            <p class="company">{job.company}</p>
            <p class="summary">{job.summary}</p>
            <ul class="points">
              {#each job.points as point}
                <li>{point}</li>
              {/each}
            </ul>
          </div>
        </li>
      {/each}
    </ol>
  </div>
</section>

<style>
  .head {
    margin-bottom: clamp(3.5rem, 7vw, 6rem);
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

  .timeline {
    list-style: none;
  }

  .entry {
    display: grid;
    grid-template-columns: 48px 220px 1fr;
    gap: clamp(1rem, 3vw, 3rem);
    padding-block: clamp(2.4rem, 4vw, 3.6rem);
    border-top: 1px solid var(--ink-line);
  }
  .entry:last-child {
    border-bottom: 1px solid var(--ink-line);
  }

  .rail {
    position: relative;
    display: flex;
    justify-content: center;
  }
  .rail::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: -100%;
    width: 1px;
    background: var(--ink-line);
  }
  .entry:last-child .rail::before {
    bottom: 0;
  }
  .node {
    position: relative;
    z-index: 1;
    width: 11px;
    height: 11px;
    margin-top: 0.55rem;
    border-radius: 50%;
    background: var(--ink);
    border: 1px solid var(--on-dark-faint);
    transition: border-color 0.4s var(--ease), background 0.4s var(--ease), box-shadow 0.4s var(--ease);
  }
  .entry:hover .node {
    background: var(--accent);
    border-color: var(--accent);
    box-shadow: 0 0 0 5px var(--accent-soft);
  }

  .when {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    padding-top: 0.3rem;
  }
  .period {
    font-family: var(--mono);
    font-size: 0.82rem;
    letter-spacing: 0.04em;
    color: var(--on-dark);
  }
  .place {
    font-size: 0.86rem;
    color: var(--on-dark-faint);
    line-height: 1.4;
  }

  .role {
    font-size: clamp(1.5rem, 3vw, 2.2rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    line-height: 1.1;
  }
  .company {
    color: var(--accent);
    font-size: 1.02rem;
    margin-top: 0.2rem;
    margin-bottom: 1.1rem;
  }
  .summary {
    color: var(--on-dark);
    font-size: 1.08rem;
    line-height: 1.55;
    max-width: 60ch;
    margin-bottom: 1.4rem;
  }

  .points {
    list-style: none;
    display: grid;
    gap: 0.7rem;
    max-width: 64ch;
  }
  .points li {
    position: relative;
    padding-left: 1.4rem;
    color: var(--on-dark-muted);
    font-size: 0.98rem;
    line-height: 1.55;
  }
  .points li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.62em;
    width: 6px;
    height: 1px;
    background: var(--accent);
  }

  @media (max-width: 860px) {
    .entry {
      grid-template-columns: 24px 1fr;
    }
    .when {
      grid-column: 2;
      flex-direction: row;
      flex-wrap: wrap;
      gap: 0.4rem 1rem;
      margin-bottom: 0.4rem;
    }
    .what {
      grid-column: 2;
    }
    .node {
      margin-top: 0.4rem;
    }
  }
</style>
