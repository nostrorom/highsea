<script lang="ts">
	import { hsl } from '$json';
	import { palette, selectedRefs } from '$lib/stores/palette';

	import Palette from '$lib/Palette.svelte';
</script>

<div class="flex justify-center pt-2 space-y-2 overflow-y-auto">
	<!-- <Palette palette={$palette} /> -->
	<Palette palette={hsl} />
</div>
