import { resolve, basename, extname } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import pakageJson from './package.json';

export default defineConfig({
	resolve: {
		alias: {
			$utils: 'lib/utils',
		},
	},
	build: {
		sourcemap: true,
		lib: {
			entry: resolve(__dirname, 'lib/index.ts'),
			name: pakageJson.name,
			fileName: basename(pakageJson.module, extname(pakageJson.module)),
		},
	},
  plugins: [dts()]
});
