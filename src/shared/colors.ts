import { writable, readable, derived, type Writable, type Readable } from 'svelte/store';

export const tailwindColors:Writable<TailwindColor[]> = writable()

export const highseaColors:Writable<HighseaColor[]> = writable()