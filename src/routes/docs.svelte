<script context="module">
	export const prerender = true;
</script>

<script>
	import { colors } from '$lib/stores/colors';
	import Palette from '$lib/Palette.svelte';
</script>

<svelte:head>
	<title>Docs</title>
</svelte:head>

<div class="mt-32 space-y-3 h-full w-full absolute">
	<div class="fixed top-12 w-4/6 pt-2 pb-1 shadow-sm bg-white">
		This section is WIP at the moment
	</div>
	{#each $colors as color (color.id)}
		<Palette {color} />
	{/each}
	{#each $colors as color (color.id)}
		<Palette {color} />
	{/each}
</div>
