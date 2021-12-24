<script>
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';

	let homepage = $page.path === '/';
</script>

<div class="p-2 py-3 mx-auto">
	<a
		href="https://nostrorom.com"
		target="_blank"
		class="flex justify-center space-x-2 px-2 py-1 rounded-md hover:bg-gray-200 mx-auto"
	>
		<img class="h-6" src="/nosdev_logo_64_nobg.png" alt="SvelteKit" />
		<div class="flex items-center">
			<p class="text-sm text-slate-500 ">by NosDev</p>
		</div>
	</a>
</div>
