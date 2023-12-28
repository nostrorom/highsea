<script lang="ts">
	import { HEX } from '@nosdev/codes';

	import type { TW } from '$types';
	import { keys } from '$utils';

	export let key: TW.TintKey;
	export let tint: TW.Tint<HEX.Code>;
</script>

<div class="flex space-x-2 px-4">
	<div class="w-12 text-xs my-auto text-right">{key}</div>
	{#each keys(tint) as shade}
		{@const hex = tint[shade]}
		<div class="h-12 w-12 rounded-md" style={`background:${hex}`}></div>
	{/each}
</div>
