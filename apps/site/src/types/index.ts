import hex from '$json/hex.json';
import { keys, type Pretty } from '../utils';
import type { HSL, HEX } from '@nosdev/codes';

type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

// eslint-disable-next-line @typescript-eslint/no-namespace
export module TW {
	export type KindKey = keyof typeof hex;

	export type ColorKey = keyof (typeof hex)['colors'];
	export type GrayKey = keyof (typeof hex)['grays'];

	export type TintKey = ColorKey | GrayKey;
	export type ShadeKey = ParseInt<keyof (typeof hex)['colors'][ColorKey]>;

	export type Shade<T> = T extends HSL.Code ? HSL.Code : T extends HEX.Code ? HEX.Code : T;
	export type Tint<T> = Pretty<Record<ShadeKey, T>>;

	export type Range<T> = Record<ColorKey, Tint<T>> | Record<GrayKey, Tint<T>>;

	export type All<T> = Record<KindKey, Range<T>>;

	export type Palette<T> = Partial<Range<T>>;
	export const colorKeys = keys(hex.colors);
	export const grayKeys = keys(hex.grays);

	export const shadeKeys = keys(hex.colors[colorKeys[0]]).map(
		(k) => parseInt(k, 10) as ParseInt<typeof k>,
	);
}
