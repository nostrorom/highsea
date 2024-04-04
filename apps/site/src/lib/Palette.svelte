<script lang="ts">
	import type { TW, IC } from '$types';
	import type { HSL } from '@nosdev/codes';

	import { keys } from '$utils';

	import Tint from '$lib/Tint.svelte';

	export let palette: TW.Palette<HSL.Code> | IC.Palette<HSL.Code>;
</script>

<div class="px-2 space-y-8">
	{#each keys(palette) as rangeKey}
		{#each keys(palette[rangeKey]) as tintKey}
			{@const tint = palette[rangeKey][tintKey]}
			{#if tint}
				<Tint {tintKey} {tint} />
			{/if}
		{/each}
	{/each}
</div>
