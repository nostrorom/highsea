<script>
	import { page } from '$app/stores';
	import Icon from '$lib/Icon.svelte';
	if (typeof window !== 'undefined') {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	const switchDarkmode = () => {
		if (localStorage.theme === 'light') {
			localStorage.theme = 'dark';
			document.documentElement.classList.add('dark');
		} else {
			localStorage.theme = 'light';
			document.documentElement.classList.remove('dark');
		}
	};
</script>

<header class="flex items-center justify-between w-full h-full mx-auto lg:w-4/6">
	<div class="flex items-center h-8 p-1 px-2 space-x-2 text-white">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 38.3 25"
			xml:space="preserve"
			class="h-full fill-current"
		>
			<path
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
		<p class="text-xl text-slate-300 font-logo">highsea</p>
	</div>

	<div class="flex h-full">
		<nav class="h-full lowercase text-slate-300">
			<ul class="flex h-full">
				<li class="h-full">
					<a
						class=""
						sveltekit:prefetch
						href="https://highsea-git-beta-nostroroms-projects.vercel.app"
						target="_blank"
					>
						<div
							class="flex items-center h-full px-3 border-t border-opacity-0 border-amber-500 hover:border-opacity-100"
						>
							v2 (beta)
						</div>
					</a>
				</li>
				<li class="h-full">
					<a class="" sveltekit:prefetch href="/">
						<div
							class="flex items-center h-full px-3 border-t border-opacity-0 border-amber-500 hover:border-opacity-100"
							class:border-opacity-100={$page.path === '/'}
						>
							Colors
						</div>
					</a>
				</li>
				<li class="h-full">
					<a class="" sveltekit:prefetch href="/docs">
						<div
							class="flex items-center h-full px-3 border-t border-opacity-0 border-amber-500 hover:border-opacity-100"
							class:border-opacity-100={$page.path === '/docs'}
						>
							Docs
						</div>
					</a>
				</li>
			</ul>
		</nav>

		<button
			on:click={switchDarkmode}
			class="flex items-center justify-center w-10 h-full px-2 border-t border-opacity-0 text-slate-400 border-amber-500 hover:border-opacity-100"
		>
			<Icon icon="darkmode" size="h-4" />
		</button>
		<div class="bg-slate-600 00 w-0.5 m-2" />

		<a
			class="flex items-center justify-center w-10 h-full px-2 border-t border-opacity-0 text-slate-400 border-amber-500 hover:border-opacity-100"
			href="https://github.com/Nostrorom/highsea"
			target="_blank"
		>
			<Icon icon="github" size="h-4" />
		</a>

		<a
			class="flex items-center justify-center w-10 h-full px-2 border-t border-opacity-0 text-slate-400 border-amber-500 hover:border-opacity-100"
			href="https://www.patreon.com/nosdev"
			target="_blank"
		>
			<Icon icon="patreon" size="h-4" />
		</a>
	</div>
</header>
