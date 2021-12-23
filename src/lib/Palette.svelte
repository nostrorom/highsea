<script>
	export let color;
</script>

<div class="px-1">
	<div class="grid grid-cols-11 gap-1 w-full h-full text-xs lg:text-sm">
		<div class="flex flex-col items-end px-1 lg:px-2 mr-2 border-r border-slate-300">
			<h5 class="text-slate-700 font-semibold text-sm">
				{color.id}
			</h5>
			<p class="text-slate-500">
				{color.refHue}
			</p>
		</div>
		{#each color.levels as level}
			<div class="">
				<div class="h-12 w-full rounded-lg" style="background:{level['hex']}" />
				<div class="flex justify-between px-1 space-x-1 font-mono">
					<p class="text-slate-400">
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
