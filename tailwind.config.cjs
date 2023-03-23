/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			mono: 'JetBrains Mono',
			main: 'Mulish',
			logo: 'Poppins'
		}
	}
};
