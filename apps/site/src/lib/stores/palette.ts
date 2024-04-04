import { hsl } from '$json';
import { TW, type IC } from '$types';
import { HSL } from '@nosdev/codes';
import { writable, derived } from 'svelte/store';

const hueMapper = {
	colors: TW.colorKeys.reduce(
		(refs, key) => ({ ...refs, [hsl.colors[key][TW.reference].H]: key }),
		{} as Record<number, TW.ColorKey>,
	),
	grays: TW.grayKeys.reduce(
		(refs, key) => ({ ...refs, [hsl.grays[key][TW.reference].H]: key }),
		{} as Record<number, TW.GrayKey>,
	),
};

const normalize = (hue: number) => (hue % 360 < 0 ? (hue % 360) + 360 : hue % 360);

const getBounds = (hue: number, rangeKey: TW.RangeKey) => {
	const normalizedHue = normalize(hue);

	let bounds: { low: IC.TintRef | null; high: IC.TintRef | null } = {
		low: null,
		high: null,
	};

	if (Object.keys(hueMapper[rangeKey]).includes(hue.toString())) {
		const TWtint = { tintKey: hueMapper[rangeKey][normalizedHue], hue: normalizedHue };
		bounds = { low: TWtint, high: TWtint };
	} else {
		const diffs = TW.palette[rangeKey].map((h) => h - normalizedHue);
		const tintKeys = {
			low: hueMapper[rangeKey][normalizedHue + Math.max(...diffs.filter((diff) => diff < 0))],
			high:
				hueMapper[rangeKey][normalizedHue + Math.min(...diffs.filter((diff) => diff > 0))] ??
				hueMapper[rangeKey][0],
		};
		bounds = {
			low: {
				tintKey: tintKeys.low,
				// @ts-expect-error 7053 - TODO: improve type narrowing between colors and grays
				hue: (hsl[rangeKey][tintKeys.low] as TW.Tint<HSL.Code>)[500].H,
			},
			high: {
				tintKey: tintKeys.high,
				// @ts-expect-error 7053 - TODO: improve type narrowing between colors and grays
				hue: (hsl[rangeKey][tintKeys.high] as TW.Tint<HSL.Code>)[500].H,
			},
		};
	}

	return bounds;
};

const interpolate = (bounds: [number, number], ratio: number) =>
	Math.round(Math.min(...bounds) + ratio * (Math.max(...bounds) - Math.min(...bounds)));

const buildTintFromHue = (hue: number, rangeKey: TW.RangeKey) => {
	let tint: TW.Tint<HSL.Code>;
	const normalizedHue = normalize(hue);
	const bounds = getBounds(normalizedHue, rangeKey);

	if (!bounds.low || !bounds.high) return null;

	if (bounds.low === bounds.high) {
		const tintKey = hueMapper[rangeKey][normalizedHue];
		// @ts-expect-error 7053 - TODO: improve type narrowing between colors and grays
		tint = hsl[rangeKey][tintKey];
	} else {
		const low = bounds.low.hue;
		const high = bounds.high.hue > bounds.low.hue ? bounds.high.hue : bounds.high.hue + 360;

		const ratio = (normalizedHue - low) / (high - low);

		tint = TW.shadeKeys.reduce((shades, shade) => {
			// @ts-expect-error 7053 - TODO: improve type narrowing between colors and grays
			const lowTint: TW.Tint<HSL.Code> = hsl[rangeKey][bounds.low.tintKey];
			// @ts-expect-error 7053 - TODO: improve type narrowing between colors and grays
			const highTint: TW.Tint<HSL.Code> = hsl[rangeKey][bounds.high.tintKey];

			return {
				...shades,
				[shade]: {
					H: interpolate([lowTint[shade].H, highTint[shade].H], ratio),
					S: interpolate([lowTint[shade].S, highTint[shade].S], ratio),
					L: interpolate([lowTint[shade].L, highTint[shade].L], ratio),
				} satisfies TW.Shade<HSL.Code>,
			};
		}, {} as TW.Tint<HSL.Code>);
	}
	return tint;
};

export const selectedRefs = writable<Record<TW.RangeKey, IC.TintRef[]>>({ colors: [], grays: [] });

const createTintkey = (tintRef: IC.TintRef, range: IC.Range<HSL.Code>, rangeKey: TW.RangeKey) =>
	(rangeKey === 'colors' ? hueMapper.colors : hueMapper.grays)[normalize(tintRef.hue)] ??
	(!Object.keys(range).includes(tintRef.tintKey) ? tintRef.tintKey : `ic${normalize(tintRef.hue)}`);

export const palette = derived(selectedRefs, (refs) => {
	return TW.rangeKeys.reduce((palette, rangeKey) => {
		return {
			...palette,
			[rangeKey]: refs[rangeKey].reduce((range, tintRef) => {
				const key = createTintkey(tintRef, range, rangeKey);
				const tint = buildTintFromHue(tintRef.hue, rangeKey);
				return {
					...range,
					...(tint ? { [key]: tint } : {}),
				};
			}, {} as IC.Range<HSL.Code>),
		};
	}, {} as IC.Palette<HSL.Code>);
});

export const spectrum = [...Array(360).keys()];
