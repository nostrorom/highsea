import { RGB } from './rgb';
import { HSL } from './hsl';

const hex2rgb = (HEX: HEX.Code): RGB.Code => {
	const inBase16 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(HEX);
	if (!inBase16) {
		return { R: 0, G: 0, B: 0 };
	}
	return {
		R: parseInt(inBase16[1], 16),
		G: parseInt(inBase16[2], 16),
		B: parseInt(inBase16[3], 16),
	};
};

const hex2hsl = (HEX: HEX.Code): HSL.Code => RGB.to.HSL(hex2rgb(HEX));

// eslint-disable-next-line @typescript-eslint/no-namespace
export module HEX {
	export type Code = string;
	export const to = {
		HSL: hex2hsl,
		RGB: hex2rgb,
	};
}
