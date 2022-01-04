<script context="module">
	export const prerender = true;
</script>

<script>
	import Text from '$lib/Text.svelte';
	import Rightbar from '$lib/Rightbar.svelte';
</script>

<svelte:head>
	<title>Docs</title>
</svelte:head>

<div class="pt-12 space-y-3 px-12 h-screen w-full md:w-3/6 md:mx-auto bg-white">
	<!-- <div class="mt-12 space-y-3 h-full w-full absolute"> -->
	<Text title="Where it all started">
		<p>You like tailwindcss, it allows you to develop faster, and it's pretty fun to use.</p>
		<p>
			There is a particular color that you like, or that you can't change because it's from a logo,
			or a client's brand, or your dog likes it, or your cat hates it, or any other reason, even no
			reason at all - you just want to.
		</p>
		<p>
			You try the nearest tailwind colors, but whichever way it always feels off, off enough to make
			you want to have another color just between the stock ones.
		</p>
		<p>
			You consider building it yourself but after fiddling a bit with a color picker, you realise it
			would be tedious to create a custom palette that fits with the existing ones, because you want
			to use some too.
		</p>
		<p>
			You search for a way to do this faster, and you don't really find anything that really saves
			time.
		</p>
	</Text>
	<Text>
		<p>This you is me.</p>
	</Text>
	<Text>
		<p>
			Well, it's also you. But also me. But...hmm. Anyway, it's how highsea was born: I didn't find
			anything easy enough for my liking, so I built it.
		</p>
	</Text>
	<Text title="How to use">
		<p>
			The first functionality is rather simple to use. Fiddle with the hues to find one you like,
			choose a name for your color, copy the code and voilà, you're good to go.
		</p>
		<p>
			The rest happens in your app, refer to
			<a
				href="https://tailwindcss.com/docs/customizing-colors#adding-additional-colors"
				target="_blank"
				class="text-blue-500 font-bold"
			>
				this section
			</a>
			of the offical docs for where the codes should go.
		</p>
	</Text>
	<Text title="What's next">
		<p>
			Many more features are coming, to make the experience of building your custom palette as easy
			and complete as possible, and with them the docs will expand as well.
		</p>

		<p>In the mean time, happy coding and I hope highsea proves useful to you.</p>
	</Text>
</div>

<div class="fixed right-0 top-0 pt-12 h-full w-3/12 hidden md:block">
	<Rightbar />
</div>
