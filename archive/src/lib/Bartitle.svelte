<script lang="ts">
	import Icon from '$lib/Icon.svelte';
	export let icon: string;
</script>

<div>
	<div class="flex font-semibold space-x-2 items-center py-1">
		<div
			class="text-white bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 p-2 rounded-lg "
		>
			<Icon {icon} size="h-4" />
		</div>
		<h5 class="leading-none text-base text-blue-900 dark:text-amber-500"><slot /></h5>
	</div>
</div>
