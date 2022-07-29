<script lang="ts">
	const scrape = async () => {
		const res = await fetch('/api/scraper');
		// console.log(res);
		const data = await res.json();
		console.log(data);
	};
</script>

<div class="bg-black h-screen w-screen p-12">
	<button on:click={scrape} class="bg-teal-700 p-4 rounded-lg"> Scrape </button>
</div>
