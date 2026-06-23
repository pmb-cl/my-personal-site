import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    // adapter-auto picks the right adapter for Vercel/Netlify/Cloudflare/etc.
    // Swap to a specific adapter (e.g. @sveltejs/adapter-node) for self-hosting.
    adapter: adapter()
  }
};
