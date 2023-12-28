<script lang="ts">
	import { onMount } from 'svelte';
	import * as d3 from 'd3';
	import { hsl } from '$json';
	import { keys } from '$utils';

	let data = keys(hsl.red).map((key) => [hsl.red[key].H, parseInt(key)] satisfies [number, number]);

	onMount(() => {
		const svg = d3.select('#hueGraph');
		const margin = { top: 20, right: 30, bottom: 30, left: 60 };
		const width = 960 - margin.left - margin.right;
		const height = 500 - margin.top - margin.bottom;

		const x = d3.scaleLinear().domain([0, 360]).range([0, width]);

		const y = d3.scaleLinear().domain([0, 1000]).range([height, 0]);

		const line = d3
			.line()
			.x((d) => x(d[0]))
			.y((d) => y(d[1]));

		svg.append('g').attr('transform', `translate(${margin.left},0)`).call(d3.axisLeft(y));

		svg.append('g').attr('transform', `translate(${margin.left},${height})`).call(d3.axisBottom(x));

		svg
			.append('path')
			.datum(data)
			.attr('transform', `translate(${margin.left},0)`)
			.attr('fill', 'none')
			.attr('stroke', 'steelblue')
			.attr('stroke-linejoin', 'round')
			.attr('stroke-linecap', 'round')
			.attr('stroke-width', 1.5)
			.attr('d', line);
	});
</script>

<svg id="hueGraph" width="960" height="500"></svg>
