import { derived, writable } from 'svelte/store';

export const backgrounds = [
	'bg-transparent',
	'bg-white',
	'bg-neutral-50',
	'bg-neutral-100',
	'bg-neutral-200',
	'bg-neutral-300',
	'bg-neutral-400',
	'bg-neutral-500',
	'bg-neutral-600',
	'bg-neutral-700',
	'bg-neutral-800',
	'bg-neutral-900',
	'bg-neutral-950',
	'bg-black',
] as const;

const texts = ['text-neutral-700', 'text-black', 'text-white', 'text-neutral-300'] as const;

export const background = writable<(typeof backgrounds)[number]>('bg-white');

export const text = derived(background, (bg) =>
	bg === 'bg-transparent'
		? 'text-white'
		: texts[Math.floor((backgrounds.indexOf(bg) / backgrounds.length) * texts.length)],
);
