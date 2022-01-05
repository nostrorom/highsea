<script>
	export let title;
</script>

<div class="py-2 px-2">
	{#if title}
		<div>
			<h3 class="text-blue-900 dark:text-amber-500 text-2xl font-bold py-4">{title}</h3>
		</div>
	{/if}
	<div class="text-slate-700 dark:text-slate-300 font-sm pt-2 space-y-3">
		<slot />
	</div>
</div>
