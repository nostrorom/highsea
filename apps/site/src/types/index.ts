import hex from '$json/hex.json';
import hsl from '$json/hsl.json';
import { keys, type Pretty } from '../utils';
import type { HSL, HEX } from '@nosdev/codes';

type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

// eslint-disable-next-line @typescript-eslint/no-namespace
export module TW {
	export const rangeKeys = keys(hex);
	export type RangeKey = (typeof rangeKeys)[number];

	export type ColorKey = keyof (typeof hex)['colors'];
	export type GrayKey = keyof (typeof hex)['grays'];

	export type TintKey = ColorKey | GrayKey;
	export type ShadeKey = ParseInt<keyof (typeof hex)['colors'][ColorKey]>;

	export type Shade<T> = T extends HSL.Code ? HSL.Code : T extends HEX.Code ? HEX.Code : T;
	export type Tint<T> = Pretty<Record<ShadeKey, T>>;

	export type GenericRange<T, K extends string | number | symbol> = Pretty<Record<K, TW.Tint<T>>>;
	export type Range<T> = GenericRange<T, ColorKey | GrayKey>;

	// export type Palette<T> = Partial<Range<T>>;
	export type Palette<T> = Record<TW.RangeKey, Partial<Range<T>>>;

	export const reference: ShadeKey = 500;
	export const colorKeys = keys(hex.colors);

	export const hues = Object.values(hsl.colors).map((code) => code[reference].H);
	export const grayKeys = keys(hex.grays);

	export const shadeKeys = keys(hex.colors[colorKeys[0]]).map(
		(k) => parseInt(k, 10) as ParseInt<typeof k>,
	);
	export const palette = {
		colors: Object.values(hsl.colors).map((code) => code[reference].H),
		grays: Object.values(hsl.grays).map((code) => code[reference].H),
	};
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export module IC {
	export type TintRef = {
		tintKey: string | TW.TintKey;
		hue: number;
	};
	export type Range<T> = TW.GenericRange<T, string>;
	export type Palette<T> = Record<TW.RangeKey, Partial<Range<T>>>;
}
