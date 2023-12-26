import { resolve, basename, extname } from 'path';
import { defineConfig } from 'vite';
import pakageJson from './package.json' assert { type: 'json' };

export default defineConfig({
	resolve: {
		alias: {
			$utils: 'lib/utils',
			$modules: 'lib/modules',
			$types: 'types',
		},
	},
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, 'lib/index.js'),
			name: pakageJson.name,
			fileName: basename(pakageJson.module, extname(pakageJson.module)),
		},
	},
});
