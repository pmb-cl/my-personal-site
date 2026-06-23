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
