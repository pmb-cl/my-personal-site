<script>
  import { profile } from '../data.js';
  const year = new Date().getFullYear();
</script>

<footer>
  <div class="container inner">
    <a href="#top" class="brand">
      Phillip Bauman<span class="dot"></span>
    </a>

    <nav class="links">
      <a href="#about">About</a>
      <a href="#journey">Journey</a>
      <a href="#expertise">Expertise</a>
      <a href={profile.linkedin} target="_blank" rel="noopener">LinkedIn</a>
    </nav>

    <p class="copy">© {year} Phillip Bauman · Brooklyn, NY</p>
  </div>
</footer>

<style>
  footer {
    border-top: 1px solid var(--ink-line);
    padding-block: 5rem;
  }
  .inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1.5rem;
  }
  .brand {
    font-weight: 600;
    letter-spacing: -0.02em;
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
  }
  .dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--accent);
  }
  .links {
    display: flex;
    gap: 1.8rem;
  }
  .links a {
    font-size: 0.92rem;
    color: var(--on-dark-muted);
    transition: color 0.3s var(--ease);
  }
  .links a:hover {
    color: var(--on-dark);
  }
  .copy {
    font-family: var(--mono);
    font-size: 0.74rem;
    letter-spacing: 0.06em;
    color: var(--on-dark-faint);
  }

  @media (max-width: 700px) {
    .inner {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
