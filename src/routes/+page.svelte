<script lang="ts">
	import { grays, colors, oklchCSS, tints } from '$/tailwind';

	const wheel = Array.from({ length: 361 }, (_, i) => i);

	$: console.log(Object.values(colors).map((tint) => tint[500].H));
</script>

<h1 class="bg-red-300">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<div class="flex">
	{#each wheel as hue}
		{@const match = Object.values(colors)
			.map((tint) => Math.floor(tint[500].H))
			.find((h) => h === hue)}
		<div
			class="size-4 {match ? 'border-2 border-black' : ''}"
			style={`background-color: ${oklchCSS({ L: 0.7, C: 0.3, H: hue })}`}
		></div>
		{#if match}
			<div>
				{match}
			</div>
		{/if}
	{/each}
</div>

{#each Object.entries(grays) as [name, tint]}
	<div>{name}</div>
	<div class="flex gap-2">
		{#each Object.entries(tint) as [level, lch]}
			<div class="rounded-sm size-8" style={`background-color: ${oklchCSS(lch)}`}>{level}</div>
		{/each}
	</div>
{/each}
