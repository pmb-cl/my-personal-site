<script>
  import { about } from '../data.js';
  import { inview } from '../actions.js';
</script>

<section id="about" class="section about">
  <div class="container grid">
    <div class="aside">
      <span class="eyebrow reveal" use:inview>01 — About</span>
    </div>

    <div class="body">

      {#each about as para, i}
        <p class="para reveal" use:inview style="--reveal-delay:{120 + i * 90}ms">
          {para}
        </p>
      {/each}
    </div>
  </div>
</section>

<style>
  .about {
    background: #fff;
    color: var(--on-light);
  }
  .grid {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: clamp(2rem, 5vw, 5rem);
  }
  .aside .eyebrow {
    color: var(--on-light-faint);
    position: sticky;
    top: 110px;
    display: inline-block;
  }

  .para {
    font-size: clamp(1.05rem, 1.7vw, 1.32rem);
    line-height: 1.65;
    color: var(--on-light);
    max-width: 56ch;
    margin-bottom: 1.6rem;
  }

  @media (max-width: 860px) {
    .grid {
      grid-template-columns: 1fr;
      gap: 1.5rem;
    }
    .aside .eyebrow {
      position: static;
    }
  }
</style>
