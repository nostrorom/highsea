import tints from '$json/hex.json';
import { keys, type Pretty } from '../utils';
import type { HSL, HEX } from '@nosdev/codes';

type ParseInt<T> = T extends `${infer N extends number}` ? N : never;

// eslint-disable-next-line @typescript-eslint/no-namespace
export module TW {
	export type TintKey = keyof typeof tints;
	export type ShadeKey = ParseInt<keyof (typeof tints)[TintKey]>;

	export type Shade<T extends HSL.Code | HEX.Code> = T;
	export type Tint<T> = Pretty<Record<ShadeKey, Shade<T>>>;

	export type Range<T> = Record<TintKey, Tint<T>>;

	export type Palette<T> = Partial<Range<T>>;
	export const colorKeys = keys(tints);

	export const shadeKeys = keys(tints[colorKeys[0]]).map(
		(k) => parseInt(k, 10) as ParseInt<typeof k>,
	);
}
