import type { HSL } from './hsl';
const rgb2hsl = (RGB: RGB.Code): HSL.Code => {
	let H: number;

	let { R, G, B } = RGB;

	R /= 255;
	G /= 255;
	B /= 255;

	const max: number = Math.max(R, G, B);
	const min: number = Math.min(R, G, B);
	const diff: number = max - min;

	if (diff === 0) {
		H = 0;
	} else if (max === R) {
		H = ((((G - B) / diff) % 6) + 6) % 6;
	} else if (max === G) {
		H = (B - R) / diff + 2;
	} else if (max === B) {
		H = (R - G) / diff + 4;
	} else {
		H = -1;
	}

	const L = (min + max) / 2;
	const S = diff === 0 ? 0 : diff / (1 - Math.abs(2 * L - 1));

	return {
		H: Math.round(H * 60),
		S: Math.round(S * 100),
		L: Math.round(L * 100),
	};
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export module RGB {
	export type Code = { R: number; G: number; B: number };

	export const to = {
		HSL: rgb2hsl,
	};
}
