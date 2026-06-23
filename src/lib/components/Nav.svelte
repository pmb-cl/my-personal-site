<script>
  import { onMount } from 'svelte';

  let scrolled = $state(false);
  let menuOpen = $state(false);

  const links = [
    { href: '#about', label: 'About' },
    { href: '#journey', label: 'Journey' },
    { href: '#expertise', label: 'Expertise' },
    { href: '#contact', label: 'Contact' }
  ];

  onMount(() => {
    const onScroll = () => (scrolled = window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function close() {
    menuOpen = false;
  }
</script>

<header class:scrolled class:open={menuOpen}>
  <div class="bar container">
    <a href="#top" class="brand" onclick={close}>
      Phillip&nbsp;Bauman
      <span class="dot"></span>
    </a>

    <nav class="links">
      {#each links as link}
        <a href={link.href}>{link.label}</a>
      {/each}
    </nav>

    <a class="cta" href="#contact" onclick={close}>Get in touch</a>

    <button
      class="burger"
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span></span><span></span>
    </button>
  </div>

  {#if menuOpen}
    <nav class="mobile">
      {#each links as link}
        <a href={link.href} onclick={close}>{link.label}</a>
      {/each}
      <a href="#contact" class="mobile-cta" onclick={close}>Get in touch</a>
    </nav>
  {/if}
</header>

<style>
  header {
    position: fixed;
    inset: 0 0 auto 0;
    z-index: 50;
    transition:
      background 0.5s var(--ease),
      border-color 0.5s var(--ease),
      backdrop-filter 0.5s var(--ease);
    border-bottom: 1px solid transparent;
  }
  header.scrolled {
    background: rgba(12, 12, 13, 0.72);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom-color: var(--ink-line);
  }

  .bar {
    height: 76px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1.5rem;
  }

  .brand {
    font-weight: 600;
    font-size: 1.02rem;
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
    display: inline-block;
  }

  .links {
    display: flex;
    gap: 2.4rem;
    margin-left: auto;
    margin-right: 2.4rem;
  }
  .links a {
    font-size: 0.95rem;
    color: var(--on-dark-muted);
    position: relative;
    transition: color 0.3s var(--ease);
  }
  .links a::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -6px;
    width: 100%;
    height: 1px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.4s var(--ease);
  }
  .links a:hover {
    color: var(--on-dark);
  }
  .links a:hover::after {
    transform: scaleX(1);
  }

  .cta {
    font-size: 0.9rem;
    font-weight: 500;
    padding: 0.55rem 1.1rem;
    border: 1px solid var(--ink-line);
    border-radius: 100px;
    transition:
      border-color 0.3s var(--ease),
      background 0.3s var(--ease),
      color 0.3s var(--ease);
  }
  .cta:hover {
    background: var(--cream);
    border-color: var(--cream);
    color: var(--ink);
  }

  .burger {
    display: none;
    flex-direction: column;
    gap: 6px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 4px;
  }
  .burger span {
    width: 26px;
    height: 1.5px;
    background: var(--on-dark);
    transition: transform 0.35s var(--ease), opacity 0.35s var(--ease);
  }
  header.open .burger span:first-child {
    transform: translateY(3.75px) rotate(45deg);
  }
  header.open .burger span:last-child {
    transform: translateY(-3.75px) rotate(-45deg);
  }

  .mobile {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1rem var(--gutter) 2rem;
    background: rgba(12, 12, 13, 0.96);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--ink-line);
  }
  .mobile a {
    font-size: 1.6rem;
    font-weight: 500;
    letter-spacing: -0.03em;
    padding: 0.5rem 0;
  }
  .mobile-cta {
    color: var(--accent) !important;
  }

  @media (max-width: 860px) {
    .links,
    .cta {
      display: none;
    }
    .burger {
      display: flex;
    }
  }
</style>
