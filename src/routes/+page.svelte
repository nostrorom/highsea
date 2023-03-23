<script lang="ts">
	import { slide } from 'svelte/transition';
	import {
		tailwindColors,
		paletteColors,
		tailwindGrays,
		paletteGrays,
		paletteNames,
		allColors,
		newColor,
		sliderHue
	} from '$lib/stores/colors';
	import Palette from '$lib/Palette.svelte';
	import Colorcontrols from '$lib/Colorcontrols.svelte';
	import Palettecontrols from '$lib/Palettecontrols.svelte';
	import Rightbar from '$lib/Rightbar.svelte';

	paletteColors.set($tailwindColors);
	paletteGrays.set($tailwindGrays);

	let error = '';

	// $: if (
	// 	$paletteColors.find((color) => {
	// 		return color.refHue === $newColor.refHue;
	// 	}) !== undefined
	// ) {
	// 	error2 = 'Color already exists';
	// } else if (
	// 	$paletteColors.find((color) => {
	// 		return color.name === $newColor.name;
	// 	}) !== undefined
	// ) {
	// 	error2 = 'Name already exists';
	// } else {
	// 	error2 = false;
	// }

	const addColor = () => {
		console.log('add');
		// if (
		// 	$paletteColors.find((color) => {
		// 		return color.refHue === $newColor.refHue;
		// 	}) !== undefined
		// ) {
		// 	error = 'Color already exists';
		// } else if (
		// 	$paletteColors.find((color) => {
		// 		return color.name === $newColor.name;
		// 	}) !== undefined
		// ) {
		// 	error = 'Name already exists';
		// } else {
		// 	error = '';
		// 	paletteColors.set([...$paletteColors, $newColor]);
		// 	$paletteColors.sort((colorA, colorB) => {
		// 		return colorA.refHue - colorB.refHue;
		// 	});
		// }
	};

	const viewColor = (hue: number) => {
		sliderHue.set(hue);
	};

	const removeColor = (name: string) => {
		paletteColors.set([...$paletteColors.filter((color) => color.name !== name)]);
	};
</script>

<svelte:head>
	<title>Colors</title>
</svelte:head>

<div class="fixed left-0 top-0 pt-12 h-full w-1/6 hidden md:block">
	<Colorcontrols on:add={addColor} />
</div>

<div class="pt-64 md:pt-52 lg:pt-44 xl:pt-32 2xl:pt-28 h-full w-full md:w-4/6 md:mx-auto">
	<div
		class="fixed top-12 z-10 w-full md:w-4/6 border-b-8 border-gray-200 dark:border-slate-900 shadow-sm shadow-gray-200 dark:shadow-slate-900"
	>
		<div class="flex md:hidden">
			<Colorcontrols mobile="true" />
		</div>
		<div class="relative bg-gray-100 dark:bg-slate-800">
			<Palette color={$newColor} controls={false} />
		</div>
	</div>
	<div class="pt-8 md:pt-6">
		{#each $paletteColors as color (color.name)}
			<div transition:slide>
				<Palette
					{color}
					on:remove={() => {
						removeColor(color.name);
					}}
					on:view={() => {
						viewColor(color.refHue);
					}}
				/>
			</div>
		{/each}
		<br />
		{#each $paletteGrays as color (color.name)}
			<div transition:slide>
				<Palette
					{color}
					on:remove={() => {
						removeColor(color.name);
					}}
					on:view={() => {
						viewColor(color.refHue);
					}}
					controls={false}
				/>
			</div>
		{/each}
		<!-- {#each $allColors as color (color.name)}
			<div transition:slide>
				<Palette
					{color}
					on:remove={() => {
						removeColor(color.name);
					}}
					on:view={() => {
						viewColor(color.refHue);
					}}
				/>
			</div>
		{/each} -->
	</div>
</div>

<div class="fixed right-0 top-0 pt-12 h-full w-1/6 hidden md:block">
	<Palettecontrols />
</div>
