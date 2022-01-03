<script context="module">
	export const prerender = true;
</script>

<script>
	import { tailwindColors, paletteColors, newColor, sliderHue } from '$lib/stores/colors';
	import Palette from '$lib/Palette.svelte';
	import Colorcontrols from '$lib/Colorcontrols.svelte';
	import Rightbar from '$lib/Rightbar.svelte';

	paletteColors.set($tailwindColors);

	$paletteColors.sort((colorA, colorB) => {
		return colorB.refHue - colorA.refHUe;
	});

	$: console.log(paletteColors);
</script>

<svelte:head>
	<title>Colors</title>
</svelte:head>

<div class="fixed left-0 top-0 pt-12 h-full w-1/6 hidden md:block">
	<Colorcontrols />
</div>

<div class="pt-64 md:pt-56 lg:pt-32 h-full w-full md:w-4/6 md:mx-auto bg-white dark:bg-black">
	<div class="fixed top-12 pt-2 z-10 w-full md:w-4/6 shadow-sm bg-white dark:bg-black">
		<div class="flex md:hidden">
			<Colorcontrols mobile="true" />
		</div>
		<Palette color={$newColor} />
	</div>
	<div class="space-y-2 pt-4">
		{#each $paletteColors as color (color.name)}
			<Palette
				{color}
				on:click={() => {
					sliderHue.set(color.refHue);
				}}
			/>
		{/each}
		{#each $paletteColors as color (color.name)}
			<Palette
				{color}
				on:click={() => {
					sliderHue.set(color.refHue);
				}}
			/>
		{/each}
	</div>
</div>

<div class="fixed right-0 top-0 pt-12 h-full w-1/6 hidden md:block">
	<Rightbar />
</div>
