/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#the-app-namespace
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

interface RGB {
	r: number;
	g: number;
	b: number;
}
interface HSL {
	h: number;
	s: number;
	l: number;
}

interface BaseShade {
	level: number;
	hex: string;
}

interface FullShade extends BaseShade {
	rgb?: RGB;
	hsl: HSL;
}

interface TailwindColor {
	name: string;
	shades: BaseShade[];
}

interface HighseaColor extends TailwindColor {
	shades: FullShade[]
}
