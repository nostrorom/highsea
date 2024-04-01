<script lang="ts">
	import { hex } from '$json';
	import { keys } from '$utils';
	import Tint from '$lib/Tint.svelte';
</script>

<div class="pt-2 space-y-2 overflow-y-auto">
	{#each keys(hex.colors) as key}
		<Tint {key} tint={hex.colors[key]}></Tint>
	{/each}
</div>
<div class="pt-2 space-y-2 overflow-y-auto">
	{#each keys(hex.grays) as key}
		<Tint {key} tint={hex.grays[key]}></Tint>
	{/each}
</div>
