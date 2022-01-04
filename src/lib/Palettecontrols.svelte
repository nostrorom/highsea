<script>
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import Icon from '$lib/Icon.svelte';
	import Logo from '$lib/Logo.svelte';
	import Codeblock from '$lib/Codeblock.svelte';
	import Bartitle from '$lib/Bartitle.svelte';
	import { newHue, sliderHue, newName, h2x, newColor, paletteColors } from '$lib/stores/colors';

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

				color.levels.forEach((level) => {
					colorCodes = `${colorCodes}
    ${level.id}: '${level.hex}',`;
				});
				colorCodes = `${colorCodes}
  },`;
			}
		});
		colorCodes = `${colorCodes}
},`;
	}
</script>

<div class="h-full space-y-5 px-2 lg:px-3 py-2">
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
				<div class="flex space-x-2">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={color.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm">
						{color.name}
					</p>
					<p class="text-slate-400 dark:text-slate-500 text-sm">
						{color.refHue}
					</p>
				</div>
			{/each}
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
