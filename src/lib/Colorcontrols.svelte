<script>
	import { fade } from 'svelte/transition';
	import Highlight from 'svelte-highlight';
	import javascript from 'svelte-highlight/src/languages/javascript';
	import atomOneDark from 'svelte-highlight/src/styles/atom-one-dark';
	import Icon from '$lib/Icon.svelte';
	import Bartitle from '$lib/Bartitle.svelte';
	import { newHue, sliderHue, newName, h2x, colorCodes } from '$lib/stores/colors';

	export let mobile = false;
	const hsl2rgb = $h2x;

	let hues = [...Array(450).keys()];

	let hexCodes = [];
	hues.forEach((hue) => {
		hexCodes.push(hsl2rgb({ h: hue, s: 70, l: 55 }));
	});

	let showCopyMessage = false;

	const copyCode = () => {
		navigator.clipboard.writeText($colorCodes);
		showCopyMessage = true;
		setTimeout(() => {
			showCopyMessage = false;
		}, 2500);
	};
</script>

<svelte:head>
	{@html atomOneDark}
</svelte:head>

{#if !mobile}
	<div class="h-full space-y-5 px-2 lg:px-3 py-2">
		<Bartitle icon="sliders" />
		<div class="">
			<label for="newName">
				<div class="flex space-x-1 py-1 items-center">
					<div
						class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
					/>
					<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Name</p>
				</div>
				<input
					class="bg-white dark:bg-slate-700 mt-1 px-2 rounded-md w-full focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-300"
					type="text"
					id="newName"
					onfocus="this.select();"
					bind:value={$newName}
				/>
			</label>
		</div>
		<div>
			<div class="flex justify-between items-center py-2 text-slate-500 leading-none">
				<div class="flex space-x-1 py-1 items-center">
					<div
						class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500  rounded-full"
					/>
					<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Hue</p>
				</div>
				{#if $sliderHue > 359}
					<p class="text-gray-500 ">{$newHue}</p>
				{/if}
				<label for="newHue">
					<input
						class="bg-white dark:bg-slate-700 px-2 rounded-md w-12 focus:ring-2 ring-amber-500 focus:outline-none text-slate-700 dark:text-slate-300 text-right"
						type="number"
						id="newHue"
						min="0"
						max="450"
						onfocus="this.select();"
						bind:value={$sliderHue}
					/>
				</label>
			</div>
			<div class="flex rounded-md shadow-sm overflow-hidden">
				{#each hexCodes as hex}
					<div style={`background:${hex}`} class="w-1 h-5" />
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
		<div>
			<div class="flex space-x-1 py-1 items-center">
				<div
					class="h-3 w-3 bg-gradient-to-tr from-slate-900 to-blue-700 dark:from-amber-900 dark:to-amber-500 rounded-full"
				/>
				<p class="text-blue-900 dark:text-amber-500 font-semibold leading-none">Code</p>
			</div>

			<div class="text-xs rounded-md overflow-hidden relative">
				<Highlight language={javascript} code={$colorCodes} />
				<button
					on:click={copyCode}
					class="absolute top-2 right-2 p-1.5 rounded-md h-7 text-gray-400 hover:text-gray-200 hover:bg-gray-700"
				>
					<svg
						aria-hidden="true"
						focusable="false"
						data-prefix="far"
						data-icon="clone"
						class="svg-inline--fa fa-clone fa-w-16 h-full"
						role="img"
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						><path
							fill="currentColor"
							d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
						/></svg
					>
				</button>
				{#if showCopyMessage}
					<div
						transition:fade
						class="absolute top-2 right-2 p-1.5 rounded-md text-gray-50 bg-gray-700"
					>
						Copied to clipboard
					</div>
				{/if}
			</div>
		</div>
	</div>
{:else}
	<div class="px-3 pt-2 w-full flex text-sm">
		<div class="w-1/3 flex space-x-2">
			<div class="w-2/3">
				<label for="newName">
					<input
						class="bg-gray-200 dark:bg-slate-700 shadow-sm px-2 w-full h-6 rounded-md focus:ring-amber-500 focus:ring-2 focus:outline-none text-slate-700 dark:text-slate-300"
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
				{#each hexCodes as hex}
					<div style={`background:${hex}`} class="w-1 h-6" />
				{/each}
			</div>
			<div>
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
