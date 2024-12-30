import tw from 'tailwindcss/colors';

/**
 * @typedef LCH @prop {number} L @prop {number} C @prop {number} H
 * @typedef {Record<string,LCH>} Tint
 * @typedef {Record<string,Tint>} Range
 */

const /**@type {Range} */ tints = {};
const /**@type {Range} */ colors = {};
const /**@type {Range} */ grays = {};

/**  @param {number} L @param {number} C @param {number} H @returns {LCH} */
// used in 'eval' in the for loop
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const oklch = (L, C, H) => ({ L, C, H });

for (const [tint, specs] of Object.entries(tw)) {
	if (typeof specs === 'string') continue; // ignore inherit, current, transparent, black, white

	tints[tint] = {};

	for (const [level, lch] of Object.entries(specs)) {
		tints[tint][level] = eval(lch.split(' ').join(','));
	}

	if (tints[tint][500].C >= 0.1) {
		colors[tint] = tints[tint];
	} else {
		grays[tint] = tints[tint];
	}
}

/**  @param {LCH} lch @returns {string} */
const oklchCSS = (lch) => `oklch(${lch.L} ${lch.C} ${lch.H})`;

// -------
// import { colors, grays } from './tailwind';

/**
 * @typedef LHH @prop {number} L @prop {number} C @prop {number} H
 * @typedef {Record<string,LCH>} Tint
 * @typedef {Record<string,Tint>} Range
 */

/** @param {Tint} tint @param {'colors'|'grays'} [range] @param {number} [ref] */
export function findBounds(tint, range = 'colors', ref = 500) {
	const base = range === 'colors' ? colors : grays;
	const { H } = tint[ref];

	// const refs = Object.entries(base)
	// 	.map(
	// 		/** @returns {[string,number]}*/
	// 		([name, tint]) => [name, tint[ref].H],
	// 	)

	/** @param {number} h */
	const getName = (h) => Object.entries(base).find(([, tint]) => tint[ref].H === h)?.[0];

	const map = new Map(Object.values(base).map((tint) => [tint[ref].H, tint]));

	const hues = Array.from(map.keys()).sort((a, b) => a - b);

	// const hues = Object.values(base)
	// 	.map((t) => t[ref].H)
	// 	.sort((a, b) => a - b);

	if (hues.some((h) => h === H)) return map.get(H);

	const below = hues.filter((h) => h < H);
	const above = hues.filter((h) => h > H);

	const low = Math.max(...(below.length ? below : hues));
	const high = Math.min(...(above.length ? above : hues));

	console.log('\n', low, '--- [', H, '] ---', high);

	const bounds = {
		low: map.get(low)?.[500],
		high: map.get(high)?.[500],
	};

	console.log(bounds);
}

findBounds({ 500: { L: 0, C: 0.29, H: 18 } });

// console.log(colors);
