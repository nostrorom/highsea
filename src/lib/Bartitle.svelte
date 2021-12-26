<script>
	import Icon from '$lib/Icon.svelte';
	export let icon;
</script>

<div>
	<div class="flex font-semibold space-x-2 items-center border-blue-800 py-1">
		<div class="text-white bg-gradient-to-tr from-slate-900 to-blue-700 p-2 rounded-lg ">
			<Icon {icon} size="h-4" />
		</div>
		<h5 class="leading-none text-blue-900">Color controls</h5>
	</div>
</div>
