<script lang="ts">
	import '../tailwind.css';
	// import Header from '$lib/Header.svelte';
	// import '@fontsource/mulish';
	// import '@fontsource/poppins';
	// import '@fontsource/jetbrains-mono';
	import { palette, selectedRefs } from '$lib/stores/palette';

	import Logo from '$lib/Logo.svelte';

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
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta
		name="description"
		content="Color generator for tailwindcss: easily create full color ranges, build a palette that can be used together with the default tailwindcss colors."
	/>
	<meta name="keywords" content="tailwindcss, custom colors, color generator" />
	<meta name="author" content="Nos Dev" />
</svelte:head>

<body
	class="min-h-screen px-24 antialiased text-neutral-900 dark:text-neutral-300 bg-gradient-to-tr from-white to-indigo-50 dark:from-slate-950 dark:to-blue-950"
>
	<main>
		<div class="sticky top-0 z-10 w-full font-main">
			<div class="flex items-center h-12 mx-auto space-x-1 font-semibold tracking-wide font-main">
				<div class="text-blue-700">
					<Logo size="h-5" />
				</div>
				<div>highsea</div>
			</div>
		</div>
		<aside class="fixed z-30 w-1/6 h-full overflow-y-auto bg-neutral-800 left-24" />

		<main class="w-full max-w-4xl mx-auto font-main">
			<slot />
		</main>
	</main>
</body>
