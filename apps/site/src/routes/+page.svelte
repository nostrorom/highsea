<script lang="ts">
	import { backgrounds, background, text } from '$lib/stores/background';
	import { hsl } from '$json';
	import { palette, selectedRefs } from '$lib/stores/palette';

	import Palette from '$lib/Palette.svelte';
</script>

<div class="flex justify-center pt-2 space-y-2 overflow-y-auto">
	<section>
		<div class="flex items-center justify-center w-full pb-6 space-x-1">
			<div class="pr-2 text-xs">bg</div>
			{#each backgrounds as bg}
				<button
					class=" h-5 w-5 rounded-sm {bg} {bg === 'bg-transparent'
						? 'border border-neutral-500 opacity-50'
						: ''}"
					on:click={() => {
						background.set(bg);
					}}
				></button>
			{/each}
		</div>
		<div class="{$background} {$text} py-6 px-2 mb-24 rounded-xl">
			<Palette palette={hsl} />
		</div>
	</section>
</div>
