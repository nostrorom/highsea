<script>
	import Logo from '$lib/Logo.svelte';
	import { createEventDispatcher } from 'svelte';
	import Icon from './Icon.svelte';

	const dispatch = createEventDispatcher();
	export let color;
	export let controls = true;

	const view = () => {
		dispatch('view');
	};
	const edit = () => {
		dispatch('edit');
	};
	const remove = () => {
		dispatch('remove');
	};
</script>

<div class="font-mono">
	<div class="grid grid-cols-12 text-xs xl:text-sm relative group">
		<div
			class="col-span-6 lg:col-span-2 xl:col-span-1 flex lg:items-end justify-start pt-2 lg:flex-col lg:p-2 space-x-3"
		>
			<div class="flex items-center text-blue-900 dark:text-white">
				<Logo logo={color.type} size="h-2" />
			</div>
			<p class="text-slate-700 dark:text-slate-300 text-sm">
				{color.name}
			</p>
			<p class="text-slate-400 dark:text-slate-400 text-sm">
				{color.refHue}
			</p>
		</div>

		<div
			class="col-span-12 bg-white dark:bg-black p-2 lg:col-span-10 xl:col-span-11 grid grid-cols-5 xl:grid-cols-10 gap-y-1 gap-x-2 lg:gap-x-1 w-full h-full "
		>
			{#each color.levels as level}
				<div class="font-mono">
					<div class="h-12 w-full rounded-lg relative" style="background:{level['hex']}">
						<div
							class="opacity-85 text-slate-500 dark:text-slate-400 rounded-br-md px-1 absolute top-0 bg-white dark:bg-black left-0 lg:hidden"
						>
							{level.id}
						</div>
					</div>
					<div
						class="flex flex-col lg:flex-row xl:flex-col 2xl:flex-row justify-between px-1 pt-0.5 font-mono"
					>
						<p class="text-slate-600 dark:text-slate-300 ">
							{level.hex}
						</p>
						<p class="text-slate-400 dark:text-slate-500 hidden lg:flex">
							{level.id}
						</p>
					</div>
				</div>
			{/each}
			{#if controls}
				<div class="flex-col opacity-100 md:opacity-0 group-hover:opacity-100 absolute -left-0">
					<div class="flex flex-col items-center text-slate-400 dark:text-slate-500 pl-1 pr-3">
						<button on:click={view} class="pb-2 hover:text-lime-600">
							<Icon icon="view" size="h-4" />
						</button>

						<button on:click={remove} class="pb-2 hover:text-red-700">
							<Icon icon="remove" size="h-4" />
						</button>
					</div>
				</div>
			{/if}
		</div>
	</div>
</div>
