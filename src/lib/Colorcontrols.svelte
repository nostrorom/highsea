<script>
	import { slide } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	import Icon from '$lib/Icon.svelte';
	import Bartitle from '$lib/Bartitle.svelte';
	import Codeblock from '$lib/Codeblock.svelte';
	import {
		newHue,
		sliderHue,
		newName,
		newColor,
		h2x,
		paletteColors,
		paletteNames
	} from '$lib/stores/colors';

	export let mobile = false;
	const hsl2hex = $h2x;
	const dispatch = createEventDispatcher();

	let hues = [...Array(450).keys()];

	let hexCodes = hues.map((hue) => {
		return {
			hue,
			hex: hsl2hex({ h: hue, s: 70, l: 55 })
		};
	});

	let error = {};

	const addColor = () => {
		let duplicateHue = $paletteColors.filter((color) => {
			return color.refHue === $newColor.refHue;
		});
		let duplicateName = $paletteColors.filter((color) => {
			return color.name.toString() === $newColor.name.toString();
		});

		if (duplicateHue.length !== 0) {
			error = { message: 'Duplicate hue', name: duplicateHue[0].name, hue: duplicateHue[0].refHue };
		} else if (duplicateName.length !== 0) {
			error = {
				message: 'Duplicate name',
				name: duplicateName[0].name,
				hue: duplicateName[0].refHue
			};
		} else {
			error = {};
			paletteColors.set([...$paletteColors, $newColor]);
			$paletteColors.sort((colorA, colorB) => {
				return colorA.refHue - colorB.refHue;
			});
		}
	};

	let colorCodes;

	$: {
		colorCodes = `${$newName}: {`;
		$newColor.levels.forEach((level) => {
			colorCodes = `${colorCodes}
  ${level.id}: '${level.hex}',`;
		});
		colorCodes = `${colorCodes}
},`;
	}
</script>

{#if !mobile}
	<div class="h-full space-y-5 px-2 lg:px-3 py-2">
		<Bartitle icon="sliders">Color</Bartitle>
		<div class="">
			<label for="newName">
				<div class="flex space-x-1 py-1 items-center">
					<div
						class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
					/>
					<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Name</p>
				</div>
			</label>
			<input
				class="bg-white dark:bg-slate-700 mt-1 px-2 py-1 rounded-md w-full focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-300"
				type="text"
				id="newName"
				onfocus="this.select();"
				bind:value={$newName}
			/>
		</div>
		<div>
			<div class="flex justify-between items-center py-2 text-slate-500 leading-none">
				<div class="flex space-x-1 py-1 items-center ">
					<div
						class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
					/>
					<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Hue</p>
				</div>
				{#if $sliderHue > 359}
					<p class="text-gray-500 ">{$newHue}</p>
				{/if}
				<label for="newHue" />
				<input
					class="bg-white dark:bg-slate-700 px-2 py-1 w-1/3 rounded-md focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-300 text-right"
					type="number"
					id="newHue"
					min="0"
					max="450"
					onfocus="this.select();"
					bind:value={$sliderHue}
				/>
			</div>
			<div class="flex rounded-md shadow-sm overflow-hidden">
				{#each hexCodes as code}
					<div
						style={`background:${code.hex}`}
						class="w-1 h-5"
						on:click={() => {
							sliderHue.set(code.hue);
						}}
					/>
				{/each}
			</div>
			<div>
				<input
					bind:value={$sliderHue}
					type="range"
					min="0"
					max="450"
					class="slider bg-white dark:bg-slate-700 h-2 w-full rounded-sm"
				/>
			</div>
		</div>
		{#if error.message !== undefined}
			<div
				transition:slide
				class="text-sm border-2 border-red-700 text-amber-500 px-2 py-1 rounded-md bg-slate-800"
			>
				{error.message}
				<div class="flex justify-between">
					<div class="opacity-80">{error.name}</div>
					<div class="opacity-70">{error.hue}</div>
				</div>
			</div>
		{/if}
		<button
			on:click={addColor}
			class="text-white flex mx-auto space-x-2 justify-around items-center bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 py-1 px-2 rounded-lg "
		>
			<Icon icon="add" size="h-4" />
			<div class="text-sm">Add color</div>
		</button>
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
{:else}
	<div class="px-3 pt-2 w-full flex text-sm bg-white dark:bg-slate-900">
		<div class="w-1/3 flex space-x-2">
			<div class="w-2/3">
				<label for="newName">
					<input
						class="bg-gray-200 dark:bg-slate-700 shadow-sm px-2 h-6 w-full rounded-md focus:ring-amber-500 focus:ring-2 focus:outline-none text-slate-700 dark:text-slate-300"
						onfocus="this.select();"
						type="text"
						id="newName"
						bind:value={$newName}
					/>
				</label>
			</div>
			<div class="w-1/3">
				<label for="newHue">
					<input
						class="bg-gray-200 dark:bg-slate-700 shadow-sm px-2 w-full h-6 rounded-md focus:ring-amber-500 focus:ring-2 focus:outline-none text-slate-700 dark:text-slate-300 text-right"
						type="number"
						id="newHue"
						min="0"
						max="450"
						onfocus="this.select();"
						bind:value={$sliderHue}
					/>
				</label>
				{#if $sliderHue > 359}
					<div class="flex justify-end">
						<p class="text-slate-400 pr-1.5">{$newHue}</p>
					</div>
				{/if}
			</div>
		</div>
		<div class="w-2/3 pl-2">
			<div class="flex rounded-md shadow-sm overflow-hidden">
				{#each hexCodes as code}
					<div
						style={`background:${code.hex}`}
						class="w-1 h-5"
						on:click={() => {
							sliderHue.set(code.hue);
						}}
					/>
				{/each}
			</div>
			<div class="pb-1">
				<input
					bind:value={$sliderHue}
					type="range"
					min="0"
					max="450"
					class="slider bg-gray-300 dark:bg-slate-700 h-2 w-full rounded-sm"
				/>
			</div>
		</div>
	</div>
{/if}

<style>
	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 2px solid #fff;
		background: #777;
		cursor: pointer;
	}

	.slider::-moz-range-thumb {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		border: 2px solid #fff;
		background: #777;
		cursor: pointer;
	}
	input::-webkit-outer-spin-button,
	input::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}

	input[type='number'] {
		-moz-appearance: textfield;
	}
</style>
