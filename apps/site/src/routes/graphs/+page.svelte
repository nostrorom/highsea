<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { hsl } from '$json';
	import { keys, type Pretty } from '$utils';
	import { TW } from '$types';
	import { HSL } from '@nosdev/codes';
	import { browser } from '$app/environment';

	type Dimension = Omit<'H' | 'S' | 'L', 'H'>;

	let d: Dimension = 'H';

	type Point = [number, number];

	type SVG = d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

	const margin = { top: 20, right: 30, bottom: 30, left: 60 };
	const width = 960 - margin.left - margin.right;
	const height = 500 - margin.top - margin.bottom;

	const x = d3.scaleLinear().domain([0, 1000]).range([0, width]);

	const y = d3.scaleLinear().domain([0, 105]).range([height, 0]);

	const line = d3
		.line()
		.x((d) => x(d[0]))
		.y((d) => y(d[1]));

	function createLine(
		svg: SVG,
		tint: TW.Tint<HSL.Code>,
		dimension: Dimension,
		shadeKey: TW.ShadeKey,
	) {
		const points: Point[] = TW.shadeKeys.map((key) => [key, tint[key][dimension]]);

		const color = HSL.to.HEX(tint[500]);

		svg
			.append('path')
			.datum(points)
			.attr('transform', `translate(${margin.left},0)`)
			.attr('fill', 'none')
			.attr('stroke', color)
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1.5)
			.attr('d', line);

		svg
			.selectAll('.data-points')
			.data(points)
			.enter()
			.append('circle')
			.attr('fill', color)
			.attr('r', 3)
			.attr('transform', `translate(${margin.left},0)`)
			.attr('cx', (d) => x(d[0]))
			.attr('cy', (d) => y(d[1]));
	}

	function createAllLines(svg: SVG, dimension: Dimension, shadeKey: TW.ShadeKey) {
		TW.colorKeys.forEach((key) => createLine(svg, hsl[key], dimension, shadeKey));
	}

	let svg: d3.Selection<d3.BaseType, unknown, HTMLElement, any>;

	onMount(() => {
		svg = d3.select('#hueGraph');

		svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

		svg.append('g').attr('transform', `translate(${margin.left},${height})`).call(d3.axisBottom(x));

		createAllLines(svg, d, 500);
	});

	// $: if (svg) {
	// 	createAllLines(svg, d, 500);
	// }
</script>

<div>
	<div class="bg-blue-900 h-4 mb-12" on:click={() => (d = d === 'S' ? 'L' : 'S')}>
		{d}
	</div>

	<div>
		<svg id="hueGraph" width="960" height="500"></svg>
	</div>
</div>
