import tints from '$json/hex.json';
import { keys, type Pretty } from '../utils';
import type { HSL, HEX } from '@nosdev/codes';

// eslint-disable-next-line @typescript-eslint/no-namespace
export module TW {
	export type TintKey = keyof typeof tints;
	export type ShadeKey = keyof (typeof tints)[TintKey];

	export type Shade<T extends HSL.Code | HEX.Code> = T;
	export type Tint<T> = Pretty<Record<ShadeKey, Shade<T>>>;

	export type Range<T> = Record<TintKey, Tint<T>>;

	export type Palette<T> = Partial<Range<T>>;
	export const colorKeys = keys(tints);

	export const shadeKeys = keys(tints[colorKeys[0]]);
}
