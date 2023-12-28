<script lang="ts">
	console.log('hey');
	import { hex } from '$json';
	import { keys } from '$utils';
	import Tint from '$lib/Tint.svelte';
</script>

<div class="space-y-2 pt-2 overflow-y-auto">
	{#each keys(hex) as key}
		<Tint {key} tint={hex[key]}></Tint>
	{/each}
</div>
