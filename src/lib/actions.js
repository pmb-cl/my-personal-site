// Svelte actions for scroll-driven motion.

/**
 * Adds `.in-view` to an element the first time it enters the viewport.
 * Usage: <div use:inview={{ threshold: 0.2 }}>
 */
export function inview(node, options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -8% 0px', once = true } = options;

  if (typeof IntersectionObserver === 'undefined') {
    node.classList.add('in-view');
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          node.classList.add('in-view');
          if (once) observer.unobserve(node);
        } else if (!once) {
          node.classList.remove('in-view');
        }
      }
    },
    { threshold, rootMargin }
  );

  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}

/**
 * Counts a number up from 0 to its target when scrolled into view.
 * Usage: <span use:countup={{ value: 900, duration: 1600 }} />
 */
export function countup(node, { value = 0, duration = 1700, prefix = '', suffix = '' } = {}) {
  const reduce =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const render = (n) => {
    node.textContent = `${prefix}${n}${suffix}`;
  };
  render(0);

  let started = false;
  const run = () => {
    if (started) return;
    started = true;
    if (reduce) {
      render(value);
      return;
    }
    const start = performance.now();
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      render(Math.round(eased * value));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  if (typeof IntersectionObserver === 'undefined') {
    run();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        run();
        observer.disconnect();
      }
    },
    { threshold: 0.4 }
  );
  observer.observe(node);

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
