<script lang="ts">
	import Markdown from '$lib/Markdown.svelte';

	export let data;
</script>

<Markdown html={data.html}></Markdown>
