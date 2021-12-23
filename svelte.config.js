import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		adapter: adapter(),
		vite: {
			define: {
				'process.env': process.env
			},
			optimizeDeps: {
				include: ['highlight.js/lib/core']
			}
		},
		target: '#svelte'
	},

	preprocess: [
		preprocess({
			postcss: true
		})
	]
};

export default config;
