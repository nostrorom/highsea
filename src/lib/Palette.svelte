<script>
	export let color;
</script>

<div class="px-2">
	<div class="grid grid-cols-11 text-xs md:text-sm">
		<div
			class="col-span-3 md:col-span-1 flex justify-between md:justify-start md:flex-col items-end md:px-1 lg:px-2 mr-3 md:border-r border-slate-300 pb-2 md:pb-0"
		>
			<h5 class="text-slate-600 font-semibold text-sm">
				{color.id}
			</h5>
			<p class="text-slate-500 text-sm">
				{color.refHue}
			</p>
		</div>

		<div class="col-span-11 md:col-span-10 grid grid-cols-5 md:grid-cols-10 gap-1 w-full h-full ">
			{#each color.levels as level}
				<div class="font-mono">
					<div class="h-12 w-full rounded-lg relative" style="background:{level['hex']}">
						<div class="bg-white text-slate-500 rounded-br-md px-1 absolute top-0 left-0 md:hidden">
							{level.id}
						</div>
					</div>
					<div class="flex justify-between px-1 space-x-1 font-mono">
						<p class="text-slate-400 hidden md:block">
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
