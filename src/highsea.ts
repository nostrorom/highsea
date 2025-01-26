import { colors, grays } from './tailwind.js';

const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950] as const;
export type Level = (typeof levels)[number];
export type Dimension = 'L' | 'C' | 'H';

export type LCH = Record<Dimension, number>;
export type Tint = Record<Dimension, LCH>;
export type Range = Record<Level, Tint>;

export type Kind = 'colors' | 'grays';

export function getBoundingTints(hue: number, level = 500, kind: Kind = 'colors') {
	const map = new Map(
		Object.values(kind === 'colors' ? colors : grays).map((tint) => [tint[level].H, tint]),
	);

	if (map.has(hue))
		return {
			high: map.get(hue)!,
			low: map.get(hue)!,
		};

	const hues = [...map.keys()].sort((a, b) => a - b);

	const below = hues.filter((h) => h < hue);
	const above = hues.filter((h) => h > hue);

	const low = map.get(Math.max(...(below.length ? below : hues)))!;
	const high = map.get(Math.min(...(above.length ? above : hues)))!;

	return {
		low,
		high,
	};
}

export function createTint(H: number, level: Level = 500, kind: Kind = 'colors') {
	const { low, high } = getBoundingTints(H, level, kind);

	if (low === high) return low;

	const a = low[level].H;
	const b = high[level].H;

	const ratio = ((H < a ? H + 360 : H) - a) / ((b < a ? b + 360 : b) - a);
	const calc = (a: number, b: number) => Math.round((a + ratio * (b - a)) * 1000) / 1000;

	return levels.reduce(
		(tint, level) => ({
			...tint,
			[level]: {
				L: calc(low[level].L, high[level].L),
				C: calc(low[level].C, high[level].C),
				H: calc(low[level].H, high[level].H < low[level].H ? high[level].H + 360 : high[level].H),
			},
		}),
		{} as Tint,
	);
}
