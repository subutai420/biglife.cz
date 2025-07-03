import adapter from '@sveltejs/adapter-netlify';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    // This tells SvelteKit to use the Netlify adapter
    adapter: adapter()
  },
  preprocess: vitePreprocess()
};

export default config;