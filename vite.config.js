import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit()],
	resolve: {
		alias: {
			// $types: resolve('./src/types'),
			$json: resolve('./src/json'),
			$shared: resolve('./src/shared')
		}
	}
};

export default config;
