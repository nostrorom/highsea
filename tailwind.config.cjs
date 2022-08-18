/** @type {import('tailwindcss').Config} */

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class',
	theme: {
		extend: {},
		fontFamily: {
			main: 'sans',
			mono: 'JetBrains Mono'
		}
	},
	plugins: [require('daisyui')],
	daisyui: {
		styled: true,
		themes: [
			'night',
			'winter',
			{
				mytheme: {
					primary: '#1e3a8a',
					secondary: '#fbbf24',
					accent: '#22d3ee',
					neutral: '#6b7280',
					'base-100': '#111827',
					info: '#2dd4bf',
					success: '#84cc16',
					warning: '#d97706',
					error: '#ef4444'
				}
			}
		],
		base: true,
		utils: true,
		logs: true,
		rtl: false,
		prefix: '',
		darkTheme: 'night'
	}
};
