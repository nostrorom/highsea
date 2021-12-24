<script>
	export let title;
</script>

<div class="py-2 px-2">
	{#if title}
		<div>
			<h3 class="text-blue-900 text-2xl font-bold py-4">{title}</h3>
		</div>
	{/if}
	<div class="text-slate-700 font-sm space-y-3">
		<slot />
	</div>
</div>
