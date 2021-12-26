<script>
	import Logo from '$lib/Logo.svelte';
	export let color;
</script>

<div class="px-1.5 lg:pl-0 font-mono" on:click>
	<div class="grid grid-cols-12 text-xs xl:text-sm">
		<div
			class="col-span-12 md:col-span-3 lg:col-span-2 xl:col-span-1 flex justify-between lg:items-end lg:justify-start lg:flex-col xl:px-1 lg:px-2 mr-3 lg:border-r border-slate-300 pb-2 xl:pb-0 truncate"
		>
			<div class="flex space-x-1">
				<div class="flex items-center">
					<Logo logo={color.type} size="h-2" />
				</div>
				<p class="text-slate-700 text-sm">
					{color.id}
				</p>
			</div>
			<p class="text-slate-400 text-sm">
				{color.refHue}
			</p>
		</div>

		<div
			class="col-span-12 lg:col-span-10 xl:col-span-11 grid grid-cols-5 xl:grid-cols-10 gap-y-1 gap-x-2 lg:gap-x-1 w-full h-full "
		>
			{#each color.levels as level}
				<div class="font-mono">
					<div class="h-12 w-full rounded-lg relative" style="background:{level['hex']}">
						<div class="bg-white text-slate-500 rounded-br-md px-1 absolute top-0 left-0 xl:hidden">
							{level.id}
						</div>
					</div>
					<div class="flex justify-between px-1 space-x- font-mono">
						<p class="text-slate-400 hidden xl:block">
							{level.id}
						</p>
						<p class="text-slate-600">
							{level.hex}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
