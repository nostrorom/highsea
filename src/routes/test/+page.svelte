<script lang="ts">
	let tw: string;

	let twName: string;
	let twApply: string;

	let yo: string = 'bg-blue-500';

	$: console.log(tw, twName, twApply);
</script>

<div class="p-12 py-24 text-white">
	<button
		on:click={() => {
			tw = 'bg-red-500';
			twName = 'red';
			twApply = 'redApply';
		}}
		class="p-4 bg-slate-500">Red</button
	>
	<button
		on:click={() => {
			tw = 'bg-green-500';
			twName = 'green';
			twApply = 'greenApply';
		}}
		class="p-4 bg-slate-500">Green</button
	>

	<div class="rounded-lg p-6 m-4 border-2 {tw}">Full string</div>
	<div class="rounded-lg p-6 m-4 border-2 {twName}">Just name</div>
	<div class="rounded-lg p-6 m-4 border-2 {twApply}">Apply</div>
</div>

<style>
	.redApply {
		@apply {yo};
	}
	.greenApply {
		@apply bg-green-800;
	}
</style>
