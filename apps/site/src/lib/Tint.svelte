<script lang="ts">
	import type { TW } from '$types';
	import type { HSL } from '@nosdev/codes';

	import { keys } from '$utils';

	export let tintKey: string;
	export let tint: TW.Tint<HSL.Code>;
</script>

<div class="flex space-x-2 text-xs">
	<h6 class="pr-2 text-right w-14">
		<div class="font-bold">
			{tintKey}
		</div>
		<div class="text-xs opacity-50 monospace">{tint[500].H}</div>
	</h6>
	<div class="grid grid-cols-11 gap-x-2">
		{#each keys(tint) as shade}
			{@const hsl = tint[shade]}
			<div class="h-10 rounded-md w-14" style={`background:hsl(${hsl.H} ${hsl.S} ${hsl.L})`}></div>
		{/each}
	</div>
	<div class="pr-2 text-right w-14">
		{tintKey}
	</div>
</div>
