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

<div
	class="pt-12 space-y-3 px-12 h-screen w-full md:w-3/6 md:mx-auto bg-gray-100 dark:bg-slate-800 antialiased"
>
	<!-- <div class="mt-12 space-y-3 h-full w-full absolute"> -->
	<Text title="Color shades generator">
		<p>
			TailwindCSS default colors are mainly defined by their hue. To create a new color, select the
			hue with the slider or directly type the value in the input field.
		</p>
		<p class="italic">Planned feature: hue finder from a hex code.</p>
	</Text>
	<Text>
		<p>
			You can choose a custom name for your color - by default highsea will name it after the chosen
			hue.
		</p>
	</Text>
	<Text>
		<p>
			For Tailwind colors, hue varies slightly along the range of shades - for the moment the hue
			chosen as reference corresponds to the shade 500.
		</p>
		<p class="italic">Planned feature: ability to change the reference shade.</p>
	</Text>
	<Text>
		<p>
			If you're only interested in this color, the code block allows you to copy just the HEX codes
			for that color.
		</p>
		<p>
			Refer to
			<a
				href="https://tailwindcss.com/docs/customizing-colors#adding-additional-colors"
				target="_blank"
				class="text-sky-500 font-bold"
			>
				the tailwindcss docs
			</a>
			for where the codes should go.
		</p>
	</Text>

	<Text title="Palette builder">
		<p>
			By default the palette includes all the Tailwind colors. You can remove the ones you do not
			wish to use. You can always add them back in your palette via the Tailwind menu.
		</p>
		<p>
			NOTE: the five grays as well as black and white are included so that you can copy the full
			code block - even if they are not customizable yet.
		</p>

		<p class="italic">Planned feature: color shade builder for grays.</p>
	</Text>

	<Text>
		<p>
			The code block allows you to copy the HEX codes for your custom colors and the tailwind colors
			you choose to include.
		</p>

		<p>
			Refer to
			<a
				href="https://tailwindcss.com/docs/customizing-colors#adding-additional-colors"
				target="_blank"
				class="text-sky-500 font-bold"
			>
				the tailwindcss docs
			</a>
			for where the codes should go.
		</p>
	</Text>
	<Text title="What's next">
		<p>
			Planned features: HEX picker, shade reference change, gray shade builder, color harmonies, and
			others to be defined.
		</p>
	</Text>
</div>

<div class="fixed right-0 top-0 pt-12 h-full w-3/12 hidden md:block">
	<Rightbar />
</div>
