<script>
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
</script>

<header class="flex h-full w-full md:w-4/6  mx-auto md:px-2 justify-between items-center">
	<div class="h-8 p-1 flex space-x-2 px-2">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 38.3 25"
			xml:space="preserve"
			class="fill-current h-full"
		>
			<path
				class="text-sky-50"
				fill="currentColor"
				d="M12.8,9.7C6,9.7,1.7,13.1,0,19.9c2.6-3.4,5.5-4.7,8.9-3.8c1.9,0.5,3.3,1.9,4.9,3.4C16.3,22,19.2,25,25.5,25
		c6.8,0,11.1-3.4,12.8-10.1c-2.6,3.4-5.5,4.7-8.9,3.8c-1.9-0.5-3.3-1.9-4.9-3.4C22,12.7,19.1,9.7,12.8,9.7z"
			/>
			<path
				class="text-amber-500"
				fill="currentColor"
				d="M29.6,8.9c-0.5,1.9-1.9,3.3-3.4,4.9l-0.1,0.1c1.3,1.4,2.4,2.4,3.8,2.8c0.5,0.1,1,0.2,1.5,0.2
		c1.6,0,3.1-0.8,4.5-2.3C36,14,36,13.4,36,12.8C35.9,6,32.6,1.7,25.8,0C29.2,2.6,30.4,5.5,29.6,8.9z"
			/>
		</svg>
		<p class="text-sky-50 text-xl font-logo">highsea</p>
	</div>

	<div class="h-full flex">
		<nav class="h-full text-slate-200 lowercase">
			<ul class="flex h-full">
				<li class="h-full">
					<a class="" sveltekit:prefetch href="/">
						<div
							class="h-full px-3 flex items-center border-t pb-0.5 border-amber-500 border-opacity-0 hover:border-opacity-100"
							class:border-opacity-100={$page.path === '/'}
						>
							Colors
						</div>
					</a>
				</li>
				<li class="h-full">
					<a class="" sveltekit:prefetch href="/docs">
						<div
							class="h-full px-3 flex items-center border-t pb-0.5 border-amber-500 border-opacity-0 hover:border-opacity-100"
							class:border-opacity-100={$page.path === '/docs'}
						>
							Docs
						</div>
					</a>
				</li>
			</ul>
		</nav>

		<div
			class="h-full w-10 text-slate-300 border-t border-amber-500 border-opacity-0 hover:border-opacity-100 px-2 pb-0.5 flex items-center"
		>
			<a href="https://github.com/Nostrorom/highsea" target="_blank">
				<Icon icon="github" size="h-5" />
			</a>
		</div>
		<div
			class="h-full w-10 text-slate-300 border-t border-amber-500 border-opacity-0 hover:border-opacity-100 px-2 pb-0.5 flex items-center"
		>
			<a href="https://www.patreon.com/nosdev" target="_blank">
				<Icon icon="patreon" size="h-4" />
			</a>
		</div>
	</div>
</header>
