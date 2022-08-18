<script lang="ts">
	import { onMount } from 'svelte';
	import { tailwindColors } from '$shared/colors';
	import { hex2hsl } from '$shared/converters';

	const scrape = async () => {
		const res = await fetch('/api/scraper');
		// console.log(res);
		const data = await res.json();
		// console.log(data);

		tailwindColors.set(data);
	};

	let highseaColors: HighseaColor[];

	onMount(() => {
		console.log('%cmount', 'color:darkcyan');
		scrape();
	});

	const addHSLtoColor = (color: TailwindColor): HighseaColor => ({
		name: color.name,
		shades: color.shades.map((shade) => ({
			...shade,
			hsl: hex2hsl(shade.hex)
		}))
	});

	$: if ($tailwindColors) {
		highseaColors = $tailwindColors.map((tailwindColor) => addHSLtoColor(tailwindColor));
	}

	$: console.log('%ctailwind', 'color:turquoise', $tailwindColors);
	$: console.log('%chighsea', 'color:yellow', highseaColors);
</script>

<div class="bg-black h-screen w-screen p-12">
	<button on:click={scrape} class="bg-teal-700 p-4 rounded-lg"> Scrape </button>
</div>
