<script lang="ts">
	import type { TW } from '$types';
	import type { HSL } from '@nosdev/codes';

	import { keys } from '$utils';

	export let tintKey: string;
	export let tint: TW.Tint<HSL.Code>;
</script>

<div class="flex px-4 space-x-2">
	<div class="w-12 my-auto text-xs text-right">
		<div>
			{tintKey}
		</div>
		<div class="opacity-50">{tint[500].H}</div>
	</div>
	{#each keys(tint) as shade}
		{@const hsl = tint[shade]}
		<div class="w-12 h-12 rounded-md" style={`background:hsl(${hsl.H} ${hsl.S} ${hsl.L})`}></div>
	{/each}
</div>
