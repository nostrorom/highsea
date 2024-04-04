<script>
	import { page } from '$app/stores';
	import Colorcontrols from '$lib/Colorcontrols.svelte';
	import Icon from '$lib/Icon.svelte';

	$: homepage = $page.path === '/';
</script>

<div class="">
	{#if homepage}
		<Colorcontrols />
	{/if}
</div>
