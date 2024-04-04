import { safelist } from './src/styles/md';

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {},
	},
	plugins: [require('@tailwindcss/typography')],
	safelist,
	darkMode: 'class',
};
