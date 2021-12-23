<script context="module">
	export const prerender = true;
</script>

<script>
	import { colors, newColor } from '$lib/stores/colors';
	import Palette from '$lib/Palette.svelte';
</script>

<svelte:head>
	<title>Colors</title>
</svelte:head>

<div class="mt-32 space-y-3 h-full w-full absolute">
	<div class="fixed top-12 w-4/6 pt-2 pb-1 shadow-sm bg-white">
		<Palette color={$newColor} />
	</div>
	{#each $colors as color (color.id)}
		<Palette {color} />
	{/each}
	{#each $colors as color (color.id)}
		<Palette {color} />
	{/each}
</div>
