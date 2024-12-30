<script lang="ts">
	import '../tailwind.css';

	let { children } = $props();
</script>

<div>
	<main>
		{@render children()}
	</main>
</div>
