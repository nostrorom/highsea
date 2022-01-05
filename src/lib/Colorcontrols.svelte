<script>
	import { slide } from 'svelte/transition';
	import Icon from '$lib/Icon.svelte';
	import Logo from '$lib/Logo.svelte';
	import Bartitle from '$lib/Bartitle.svelte';
	import Codeblock from '$lib/Codeblock.svelte';
	import {
		refShade,
		newHue,
		newName,
		sliderHue,
		newColor,
		h2x,
		x2h,
		paletteColors,
		paletteNames,
		allColors
	} from '$lib/stores/colors';

	export let mobile = false;
	const hsl2hex = $h2x;
	const hex2hsl = $x2h;

	let hues = [...Array(450).keys()];

	let hexCodes = hues.map((hue) => {
		return {
			hue,
			hex: hsl2hex({ h: hue, s: 70, l: 55 })
		};
	});

	$allColors.forEach((color) => {
		if (color.type === 'tailwind') {
			color.name = color.tailwindName;
		} else {
			color.name = color.highseaName;
		}
	});

	$: colorInPalette = $paletteColors.find((color) => color.refHue === $newColor.refHue);

	$: isNewColorInPalette = colorInPalette === undefined ? false : true;

	const addColor = () => {
		// if ($newName !== '') {
		paletteColors.set([...$paletteColors, $newColor]);
		newName.set('');
		$paletteColors.sort((colorA, colorB) => colorA.refHue - colorB.refHue);
		// } else {
		// 	document.getElementById('newName').focus();
		// }
	};

	const renameColor = () => {
		console.log('rename');
		// if ($newName !== '') {
		// 	colorInPalette.name = $newName;
		// } else {
		// 	document.getElementById('newName').focus();
		// }
	};

	let colorCodes;

	$: {
		colorCodes = `${$newColor.name}: {`;
		$newColor.shades.forEach((shade) => {
			colorCodes = `${colorCodes}
  ${shade.id}: '${shade.hex}',`;
		});
		colorCodes = `${colorCodes}
},`;
	}

	let userColor = { hex: '' };
	let closestColor;
	let closestShade;

	$: if (userColor.hex !== '') {
		console.log(userColor.hex);
		try {
			userColor.hsl = hex2hsl(userColor.hex);
		} catch (error) {
			console.log('invalid code');
		}
	} else {
		userColor.hsl = { h: '', s: '', l: '' };
	}

	$: if (userColor.hex !== '') {
		closestColor = $allColors.find((color) => {
			return color.refHue === userColor.hsl.h;
		});
		closestShade = closestColor.shades.find((shade) => {
			return shade.id === $refShade;
		});
	}
</script>

{#if !mobile}
	<div class="h-full space-y-5 px-2 lg:px-3 py-2 text-sm antialiased">
		<Bartitle icon="sliders">Color</Bartitle>

		<div class="">
			<label for="newColor.name">
				<div class="flex space-x-1 py-1 items-center">
					<div
						class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
					/>
					<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Name</p>
				</div>
			</label>
			<input
				class="bg-white dark:bg-sky-900 placeholder:text-slate-400 mt-1 px-2 py-1 rounded-md w-full focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-100"
				type="text"
				id="newName"
				onfocus="this.select();"
				placeholder={$newColor.name}
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
					class="bg-white dark:bg-sky-900 px-2 py-1 w-1/3 rounded-md focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-100 text-right"
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
		<!-- <div>
			<div class="flex space-x-1 py-1 items-center ">
				<div
					class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
				/>
				<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">HEX picker</p>
			</div>

			<label for="hexCode" />
			<input
				class="bg-white dark:bg-slate-700 px-2 py-1 w-full rounded-md focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-300"
				type="text"
				id="hexCode"
				min="0"
				max="450"
				onfocus="this.select();"
				placeholder="#FFFFFF"
				bind:value={userColor.hex}
			/>
			<div class="text-xs">
				{#if userColor.hex !== ''}
					<div transition:slide>
						<h6>Your color</h6>
						<div class="flex justify-between font-mono bg-white rounded-lg">
							<div class="h-10 w-1/3 rounded-lg relative" style="background:{userColor.hex}" />
							<div class="w-2/3 px-2 text-gray-600">
								<div class="flex space-x-2 py-0.5">
									<p class="text-gray-400">HEX</p>
									<p>
										{userColor.hex}
									</p>
								</div>
								<div class="flex space-x-2">
									<p class="text-gray-400">HSL</p>
									<p>{userColor.hsl.h}</p>
									<p>{userColor.hsl.s}</p>
									<p>{userColor.hsl.l}</p>
								</div>
							</div>
						</div>
						<h6>Closest Match</h6>
						<div class="flex justify-between font-mono bg-white rounded-lg">
							<div class="h-8 w-1/3 rounded-lg relative" style="background:{closestShade.hex}" />
							<div class="w-2/3 px-2">
								<div class="flex space-x-2">
									<p class="text-gray-400">HEX</p>
									<p>
										{closestShade.hex}
									</p>
								</div>
								<div class="flex space-x-2 text-gray-600">
									<p class="text-gray-400">HSL</p>
									<p>{closestShade.hsl.h}</p>
									<p>{closestShade.hsl.s}</p>
									<p>{closestShade.hsl.l}</p>
								</div>
							</div>
						</div>
					</div>
				{/if}
			</div>
		</div> -->

		{#if isNewColorInPalette}
			<div
				class="justify-between items-center rounded-lg border-2 border-gray-400 dark:border-slate-700 grid grid-cols-6"
			>
				<div class="flex space-x-2 px-2 py-1 col-span-5">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={colorInPalette.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm break-words w-2/3">
						{colorInPalette.name}
					</p>
					<div class="flex items-center">
						<p class="text-slate-400 dark:text-slate-500 text-sm ">
							{colorInPalette.refHue}
						</p>
					</div>
				</div>
				<!-- <button
					on:click={renameColor}
					class="text-slate-500 opacity-0 hover:text-white col-span-1 h-full space-x-2 flex justify-center items-center py-1 px-2 rounded-r-md"
				>
					<Icon icon="edit" size="h-4" />
				</button> -->
			</div>
		{:else}
			<div class="justify-between items-center rounded-lg border-2 border-sky-700 grid grid-cols-6">
				<div class="flex space-x-2 px-2 py-1 col-span-5">
					<div class="flex items-center text-blue-900 dark:text-white">
						<Logo logo={$newColor.type} size="h-2" />
					</div>
					<p class="text-slate-700 dark:text-slate-300 text-sm break-words w-2/3">
						{$newColor.name}
					</p>
					<div class="flex items-center">
						<p class="text-slate-400 dark:text-slate-500 text-sm ">
							{$newColor.refHue}
						</p>
					</div>
				</div>
				<button
					on:click={addColor}
					class="text-slate-200 col-span-1 h-full space-x-2 flex justify-center items-center bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-blue-900 dark:to-sky-700 py-1 px-2 rounded-r-md"
				>
					<Icon icon="add" size="h-4" />
				</button>
			</div>
		{/if}

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
				<label for="newColor.name">
					<input
						class="bg-gray-200 dark:bg-slate-700 shadow-sm px-2 h-6 w-full rounded-md focus:ring-amber-500 focus:ring-2 focus:outline-none text-slate-700 dark:text-slate-300"
						onfocus="this.select();"
						type="text"
						id="newName"
						placeholder="Choose name"
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
