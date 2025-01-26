<script lang="ts">
	import { grays, colors, oklchCSS, tints } from '$/tailwind.js';

	import { createTint, getBoundingTints } from '$/highsea';

	const wheel = Array.from({ length: 360 }, (_, i) => i);

	// $inspect(
	// 	wheel,
	// 	Object.values(colors).map((tint) => tint[500].H),
	// );

	let value = $state(86.047);
	let hue = $derived(value % 360);
	let tint = $derived(createTint(hue));

	let { low, high } = $derived(getBoundingTints(hue));

	// $inspect(hue, tint, getBoundingTints(hue));
	// $inspect(low[500].H, high[500].H);
	// $inspect(hue);
</script>

<h1 class="bg-red-300">Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>

<input type="range" min="0" max="720" bind:value />
<div>{hue}</div>

{#each Object.entries(tint) as [level, lch]}
	<div class="grid grid-cols-4 gap-8 px-12 py-2">
		<div class="rounded-sm size-8" style={`background-color: ${oklchCSS(lch)}`}>{level}</div>
		<div class="bg-gray-200">
			<div>
				{low[level].H}
			</div>
			<div class="text-xs bg-gray-100">
				L {low[level].L}
			</div>
			<div class="text-xs bg-gray-100">
				C {low[level].C}
			</div>
		</div>
		<div class="bg-gray-300">
			<div>
				{lch.H}
			</div>
			<div class="text-xs bg-gray-200">
				L {lch.L}
			</div>
			<div class="text-xs bg-gray-200">
				C {lch.C}
			</div>
		</div>
		<div class="bg-gray-200">
			<div>
				{high[level].H}
			</div>
			<div class="text-xs bg-gray-100">
				L {high[level].L}
			</div>
			<div class="text-xs bg-gray-100">
				C {high[level].C}
			</div>
		</div>
	</div>
{/each}

<!-- <div class="flex">
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
{/each} -->
