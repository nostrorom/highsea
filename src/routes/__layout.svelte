<script>
	import '../app.css';
	import Header from '$lib/Header.svelte';
	import Leftbar from '$lib/Leftbar.svelte';
	import Rightbar from '$lib/Rightbar.svelte';
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
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-F133XSHVT7"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-F133XSHVT7');
	</script>
</svelte:head>

<div class="fixed top-0 w-full font-main z-10">
	<div class="h-12 mx-auto font-main bg-gradient-to-tr from-slate-900 to-blue-900">
		<Header />
	</div>
</div>

<main class="w-full font-main">
	<div class="h-full z-40 w-1/6 fixed hidden md:block left-0 mt-12">
		<Leftbar />
	</div>
	<div class="relative w-full md:w-4/6 mx-auto">
		<slot />
	</div>
	<div class="h-full w-1/6 fixed hidden md:block right-0 mt-12">
		<Rightbar />
	</div>
</main>
