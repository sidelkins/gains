import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: false,
			env: {
				port: process.env.PORT || 8080
			}
		})
	}
};

export default config;
