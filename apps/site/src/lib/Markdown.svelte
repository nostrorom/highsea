<script lang="ts">
	import '../styles/shiki.css';
	import { prose } from '../styles/md';

	export let html: string;
</script>

<div class="{prose} pb-24">{@html html}</div>
