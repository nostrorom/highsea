<script>
	export let color;
</script>

<div class="px-2" on:click>
	<div class="grid grid-cols-11 text-xs xl:text-sm">
		<div
			class="col-span-3 xl:col-span-1 flex justify-between xl:justify-start xl:flex-col items-end xl:px-1 lg:px-2 mr-3 xl:border-r border-slate-300 pb-2 xl:pb-0"
		>
			<h5 class="text-slate-600 font-semibold text-sm">
				{color.id}
			</h5>
			<p class="text-slate-500 text-sm">
				{color.refHue}
			</p>
		</div>

		<div class="col-span-11 xl:col-span-10 grid grid-cols-5 xl:grid-cols-10 gap-1 w-full h-full ">
			{#each color.levels as level}
				<div class="font-mono">
					<div class="h-12 w-full rounded-lg relative" style="background:{level['hex']}">
						<div class="bg-white text-slate-500 rounded-br-md px-1 absolute top-0 left-0 xl:hidden">
							{level.id}
						</div>
					</div>
					<div class="flex justify-between px-1 space-x-1 font-mono">
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
