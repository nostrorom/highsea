<script lang="ts">
	import '../tailwind.css';
	// import Header from '$lib/Header.svelte';
	// import '@fontsource/mulish';
	// import '@fontsource/poppins';
	// import '@fontsource/jetbrains-mono';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta
		name="description"
		content="Color generator for tailwindcss: easily create full color ranges, build a palette that can be used together with the default tailwindcss colors."
	/>
	<meta name="keywords" content="tailwindcss, custom colors, color generator" />
	<meta name="author" content="Nos Dev" />
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-F133XSHVT7"></script>
	<!-- <script>
		window.dataLayer = window.dataLayer || [];
		function gtag() {
			dataLayer.push(arguments);
		}
		gtag('js', new Date());

		gtag('config', 'G-F133XSHVT7');
	</script> -->
</svelte:head>

<div class="bg-neutral-950 dark:bg-neutral-950 h-screen antialiased text-white">
	<div class="fixed top-0 w-full font-main z-10">
		<div class="h-12 mx-auto font-main bg-gradient-to-tr from-slate-900 to-blue-900 text-gray-500">
			<!-- <Header /> --> header
		</div>
	</div>

	<main class="w-full h-full font-main pt-12 justify-center flex">
		<slot />
	</main>
</div>
