<script lang="ts">
	import '../tailwind.css';
	// import Header from '$lib/Header.svelte';
	// import '@fontsource/mulish';
	// import '@fontsource/poppins';
	// import '@fontsource/jetbrains-mono';
	import { palette, getBounds, buildTintFromHue, selectedRefs } from '$lib/stores/palette';

	$: selectedRefs.set({
		colors: [
			{ tintKey: 'foo', hue: 0 },
			{ tintKey: 'foo', hue: 86743 },
			{ tintKey: 'foo', hue: 320 },
			{ tintKey: 'bar ', hue: 379 },
			{ tintKey: 'foo', hue: 86243 },
		],
		grays: [
			{ tintKey: 'foo', hue: 0 },
			{ tintKey: 'foo', hue: 140 },
			{ tintKey: 'foo', hue: 320 },
			{ tintKey: 'bar ', hue: 379 },
			{ tintKey: 'foo', hue: 86243 },
		],
	});
	$: console.log($palette);
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta
		name="description"
		content="Color generator for tailwindcss: easily create full color ranges, build a palette that can be used together with the default tailwindcss colors."
	/>
	<meta name="keywords" content="tailwindcss, custom colors, color generator" />
	<meta name="author" content="Nos Dev" />
	<!-- <script async src="https://www.googletagmanager.com/gtag/js?id=G-F133XSHVT7"></script> -->
	<!-- <script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-F133XSHVT7');
	</script> -->
</svelte:head>

<div class="h-screen antialiased text-white bg-neutral-950 dark:bg-neutral-950">
	<div class="fixed top-0 z-10 w-full font-main">
		<div class="h-12 mx-auto text-gray-500 font-main bg-gradient-to-tr from-slate-900 to-blue-900">
			<!-- <Header /> --> header
		</div>
	</div>

	<main class="flex justify-center w-full h-full pt-12 font-main">
		<slot />
	</main>
</div>
