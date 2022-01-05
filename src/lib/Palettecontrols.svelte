<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import Icon from '$lib/Icon.svelte';
	import Logo from '$lib/Logo.svelte';
	import Codeblock from '$lib/Codeblock.svelte';
	import Bartitle from '$lib/Bartitle.svelte';
	import {
		newHue,
		sliderHue,
		h2x,
		newColor,
		paletteColors,
		tailwindColors,
		tailwindGrays,
		paletteGrays,
		paletteHues
	} from '$lib/stores/colors';

	const black_white = [
		{ name: 'black', type: 'tailwind' },
		{ name: 'white', type: 'tailwind' }
	];

	// export let mobile = false;
	const hsl2hex = $h2x;
	const dispatch = createEventDispatcher();

	let hues = [...Array(450).keys()];

	let hexCodes = hues.map((hue) => {
		return {
			hue,
			hex: hsl2hex({ h: hue, s: 70, l: 55 })
		};
	});

	const removeColor = (name) => {
		paletteColors.set([...$paletteColors.filter((color) => color.name !== name)]);
		discardedColors.sort((colorA, colorB) => colorA.refHue - colorB.refHue);
	};

	$: discardedColors = $tailwindColors.filter(
		(twcolor) => !$paletteColors.some((color) => color.name === twcolor.name)
	);

	const restoreColor = (color) => {
		paletteColors.set([...$paletteColors, color]);
		$paletteColors.sort((colorA, colorB) => colorA.refHue - colorB.refHue);
	};

	// grays

	const removeGray = (name) => {
		paletteGrays.set([...$paletteGrays.filter((color) => color.name !== name)]);
		discardedGrays.sort((colorA, colorB) => colorA.refHue - colorB.refHue);
	};

	$: discardedGrays = $tailwindGrays.filter(
		(twcolor) => !$paletteGrays.some((color) => color.name === twcolor.name)
	);

	const restoreGray = (color) => {
		paletteGrays.set([...$paletteGrays, color]);
		$paletteGrays.sort((colorA, colorB) => colorA.refHue - colorB.refHue);
	};

	// black and white

	let paletteBWs = black_white;

	$: console.log(paletteBWs);

	const removeBW = (name) => {
		console.log('remove');
		paletteBWs = [...paletteBWs.filter((color) => color.name !== name)];
	};

	$: discardedBWs = black_white.filter(
		(twcolor) => !paletteBWs.some((color) => color.name === twcolor.name)
	);

	const restoreBW = (color) => {
		paletteBWs = [...paletteBWs, color];
	};

	// code

	let colorCodes;

	$: {
		colorCodes = `colors: {`;

		$paletteColors.forEach((color) => {
			if (color.type === 'tailwind') {
				colorCodes = `${colorCodes}
  ${color.name}: color.${color.tailwindName},`;
			} else {
				colorCodes = `${colorCodes}
  ${color.name}: {`;

				color.shades.forEach((shade) => {
					colorCodes = `${colorCodes}
    ${shade.id}: '${shade.hex}',`;
				});
				colorCodes = `${colorCodes}
  },`;
			}
		});

		$paletteGrays.forEach((color) => {
			colorCodes = `${colorCodes}
  ${color.name}: color.${color.tailwindName},`;
		});

		paletteBWs.forEach((color) => {
			colorCodes = `${colorCodes}
  ${color.name}: color.${color.name},`;
		});

		colorCodes = `${colorCodes}
},`;
	}
</script>

<div class="h-full space-y-5 px-2 lg:px-3 py-2 overflow-y-auto">
	<Bartitle icon="sliders">Palette</Bartitle>
	<div>
		<div class="flex space-x-1 py-1 items-center">
			<div
				class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
			/>
			<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Colors</p>
		</div>
		<div>
			{#each $paletteColors as color (color.name)}
				<div class="flex space-x-2 relative group">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={color.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm">
						{color.name}
					</p>
					<p class="text-slate-400 dark:text-slate-500 text-sm">
						{color.refHue}
					</p>
					<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
						<div class="flex">
							<div class="flex text-slate-400 dark:text-slate-500">
								<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

								<button
									on:click={() => {
										removeColor(color.name);
									}}
									class="hover:text-red-500 pl-4"
								>
									<Icon icon="remove" size="h-3" />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
			{#if $paletteGrays.length !== 0}
				<div class="h-1 border-b w-1/4 border-gray-300 dark:border-slate-700" />
			{/if}
			{#each $paletteGrays as color (color.name)}
				<div class="flex space-x-2 relative group">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={color.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm">
						{color.name}
					</p>
					<p class="text-slate-400 dark:text-slate-500 text-sm">
						{color.refHue}
					</p>
					<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
						<div class="flex">
							<div class="flex text-slate-400 dark:text-slate-500">
								<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

								<button
									on:click={() => {
										removeGray(color.name);
									}}
									class="hover:text-red-500 pl-4"
								>
									<Icon icon="remove" size="h-3" />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
			{#if paletteBWs.length !== 0}
				<div class="h-1 border-b w-1/4 border-gray-300 dark:border-slate-700" />
			{/if}
			{#each paletteBWs as color (color.name)}
				<div class="flex space-x-2 relative group">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={color.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm">
						{color.name}
					</p>
					<!-- <p class="text-slate-400 dark:text-slate-500 text-sm">
						{color.refHue}
					</p> -->
					<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
						<div class="flex">
							<div class="flex text-slate-400 dark:text-slate-500">
								<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

								<button
									on:click={() => {
										removeBW(color.name);
									}}
									class="hover:text-red-500 pl-4"
								>
									<Icon icon="remove" size="h-3" />
								</button>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>

	<div>
		<div class="flex space-x-1 py-1 items-center">
			<div
				class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
			/>
			<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Tailwind</p>
		</div>
		<div>
			{#if discardedColors.length === 0}
				<p class="text-slate-700 dark:text-slate-300 text-xs opacity-70 italic">
					All colors are selected
				</p>
			{:else}
				{#each discardedColors as color (color.name)}
					<div class="flex space-x-2 relative group opacity-70">
						<div class="flex items-center text-blue-900 dark:text-white">
							<Logo logo={color.type} size="h-2" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 text-sm">
							{color.name}
						</p>
						<p class="text-slate-400 dark:text-slate-500 text-sm">
							{color.refHue}
						</p>
						<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
							<div class="flex">
								<div class="flex text-slate-400 dark:text-slate-500">
									<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

									<button
										on:click={() => {
											restoreColor(color);
										}}
										class="hover:text-sky-500 pl-4"
									>
										<Icon icon="restore" size="h-3" />
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="h-1 border-b w-1/4 border-gray-300 dark:border-slate-700" />
		<div>
			{#if discardedGrays.length === 0}
				<p class="text-slate-700 dark:text-slate-300 text-xs opacity-70 italic">
					All grays are selected
				</p>
			{:else}
				{#each discardedGrays as color (color.name)}
					<div class="flex space-x-2 relative group opacity-70">
						<div class="flex items-center text-blue-900 dark:text-white">
							<Logo logo={color.type} size="h-2" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 text-sm">
							{color.name}
						</p>
						<p class="text-slate-400 dark:text-slate-500 text-sm">
							{color.refHue}
						</p>
						<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
							<div class="flex">
								<div class="flex text-slate-400 dark:text-slate-500">
									<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

									<button
										on:click={() => {
											restoreGray(color);
										}}
										class="hover:text-sky-500 pl-4"
									>
										<Icon icon="restore" size="h-3" />
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
		<div class="h-1 border-b w-1/4 border-gray-300 dark:border-slate-700" />
		<div>
			{#if discardedBWs.length === 0}
				<p class="text-slate-700 dark:text-slate-300 text-xs opacity-70 italic">
					Black and white are selected
				</p>
			{:else}
				{#each discardedBWs as color (color.name)}
					<div class="flex space-x-2 relative group opacity-70">
						<div class="flex items-center text-blue-900 dark:text-white">
							<Logo logo={color.type} size="h-2" />
						</div>
						<p class="text-slate-700 dark:text-slate-300 text-sm">
							{color.name}
						</p>

						<div class="opacity-0 group-hover:opacity-100 absolute right-0 pt-0.5">
							<div class="flex">
								<div class="flex text-slate-400 dark:text-slate-500">
									<!-- <button
								on:click={viewColor}
								class="px-2 lg:px-0 py-1 flex items-center lg:pb-2 hover:text-sky-500"
							>
								<Icon icon="view" size="h-4" />
							</button> -->

									<button
										on:click={() => {
											restoreBW(color);
										}}
										class="hover:text-sky-500 pl-4"
									>
										<Icon icon="restore" size="h-3" />
									</button>
								</div>
							</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</div>
	<div>
		<div class="flex space-x-1 py-1 items-center">
			<div
				class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
			/>
			<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Code</p>
		</div>
		<Codeblock code={colorCodes} />
	</div>
</div>
