import type { HEX } from './hex';

export const hsl2hex = (hsl: HSL.Code): HEX.Code => {
	const { H, S } = hsl;
	let { L } = hsl;

	L /= 100;

	const a: number = (S * Math.min(L, 1 - L)) / 100;

	const convertToHex = (n: number) => {
		const k: number = (n + H / 30) % 12;
		const color: number = L - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	const hex: string = `#${convertToHex(0)}${convertToHex(8)}${convertToHex(4)}`.toUpperCase();

	return hex;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export module HSL {
	export type Code = { H: number; S: number; L: number };
	export const to = {
		HEX: hsl2hex,
	};
}
