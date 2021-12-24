<script context="module">
	export const prerender = true;
</script>

<script>
	import { colors, newColor, sliderHue } from '$lib/stores/colors';
	import Palette from '$lib/Palette.svelte';
	import Colorcontrols from '$lib/Colorcontrols.svelte';
	import Leftbar from '$lib/Leftbar.svelte';
</script>

<svelte:head>
	<title>Colors</title>
</svelte:head>

<div class="mt-60 xl:mt-32 space-y-3 h-full w-full absolute">
	<div class="fixed top-12 z-10 w-full xl:w-4/6 pt-2 pb-1 shadow-sm bg-white">
		<Palette color={$newColor} />
		<div class="flex xl:hidden">
			<Colorcontrols mobile="true" />
		</div>
	</div>
	{#each $colors as color (color.id)}
		<Palette
			{color}
			on:click={() => {
				sliderHue.set(color.refHue);
			}}
		/>
	{/each}
	{#each $colors as color (color.id)}
		<Palette
			{color}
			on:click={() => {
				sliderHue.set(color.refHue);
			}}
		/>
	{/each}
</div>
