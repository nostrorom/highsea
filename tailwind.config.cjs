const colors = require('tailwindcss/colors');

const config = {
	mode: 'jit',
	purge: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			mono: 'JetBrains Mono',
			main: 'Mulish',
			logo: 'Poppins'
		},
		colors: {
			white: colors.white,
			black: colors.black,
			red: colors.red,
			orange: colors.orange,
			amber: colors.amber,
			yellow: colors.yellow,
			green: colors.green,
			lime: colors.lime,
			emerald: colors.emerald,
			teal: colors.teal,
			cyan: colors.cyan,
			sky: colors.sky,
			blue: colors.blue,
			indigo: colors.indigo,
			violet: colors.violet,
			purple: colors.purple,
			fuchsia: colors.fuchsia,
			pink: colors.pink,
			rose: colors.rose,
			slate: colors.slate,
			gray: colors.gray,
			zinc: colors.zinc,
			neutral: colors.neutral,
			stone: colors.stone
		}
	},
	plugins: []
};
module.exports = config;
