<script lang="ts">
	import { HEX } from '@nosdev/codes';

	import type { TW } from '$types';
	import { keys } from '$utils';

	export let key: TW.TintKey;
	export let tint: TW.Tint<HEX.Code>;
</script>

<div class="flex px-4 space-x-2">
	<div class="w-12 my-auto text-xs text-right">{key}</div>
	{#each keys(tint) as shade}
		{@const hex = tint[shade]}
		<div class="w-12 h-12 rounded-md" style={`background:${hex}`}></div>
	{/each}
</div>
