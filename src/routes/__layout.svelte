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
		content="Easily create your own custom colors for tailwindcss.
        Highsea generates the 50-900 range, with all the associated hex codes for you to paaste in your tailwindcss onfig file."
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

<div class="bg-gray-200 slate-900 h-full antialiased">
	<div class="fixed top-0 w-full font-main z-10">
		<div class="h-12 mx-auto font-main bg-gradient-to-tr from-slate-900 to-blue-900">
			<Header />
		</div>
	</div>

	<main class="w-full font-main">
		<slot />
	</main>
</div>
