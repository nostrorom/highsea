<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Leftbar from '$lib/Leftbar.svelte';
	import twColors from '../../static/colors.json';
	import { baseColors } from '$lib/stores/colors';
	import '@fontsource/mulish';
	import '@fontsource/poppins';
	import '@fontsource/jetbrains-mono';

	baseColors.set(twColors);
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta
		name="description"
		content="Easily get your own custom colors for tailwindcss. Generates the whole range, with code to be pasted in your tailwindcss.config file."
	/>
	<meta name="keywords" content="tailwindcss, custom colors" />
	<meta name="author" content="Nos Dev" />
</svelte:head>

<div class="fixed top-0 w-screen font-main z-10">
	<div class="w-ful h-12 mx-auto font-main bg-gradient-to-tr from-slate-900 to-blue-900">
		<Header />
	</div>
</div>

<main class="w-full font-main">
	<div class="h-full w-1/6 fixed left-0">
		<Leftbar />
	</div>
	<div class="relative w-4/6 mx-auto">
		<slot />
	</div>
</main>
