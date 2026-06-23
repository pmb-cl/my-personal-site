import { defineConfig, loadEnv } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { openrouterChat } from './server/openrouter.js';

export default defineConfig(({ mode }) => {
  // Load all env vars (including non-VITE_ prefixed) from .env — server-side only.
  const env = loadEnv(mode, process.cwd(), '');
  const apiKey = env.OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;

  return {
    plugins: [svelte(), openrouterChat(apiKey)],
    server: {
      port: 5173,
      open: false
    }
  };
});
