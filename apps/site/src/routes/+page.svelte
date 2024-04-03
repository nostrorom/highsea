<script lang="ts">
	import { hsl } from '$json';
	import { palette } from '$lib/stores/palette';

	import Palette from '$lib/Palette.svelte';
</script>

<div class="pt-2 space-y-2 overflow-y-auto">
	<Palette palette={hsl} />
</div>
<div class="pt-2 space-y-2 overflow-y-auto">
	<Palette palette={$palette} />
</div>
