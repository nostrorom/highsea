import { colors, grays } from './tailwind.js';

/**
 * @typedef LCH @prop {number} L @prop {number} C @prop {number} H
 * @typedef {Record<string,LCH>} Tint
 * @typedef {Record<string,Tint>} Range
 */

/** @param {Tint} tint @param {'colors'|'grays'} [range] @param {number} [ref] */
export function findBounds(tint, range = 'colors', ref = 500) {
	const base = range === 'colors' ? colors : grays;
	const { H } = tint[ref];

	/** @param {number} h */
	const map = new Map(Object.values(base).map((tint) => [tint[ref].H, tint]));

	const hues = Array.from(map.keys()).sort((a, b) => a - b);

	if (hues.some((h) => h === H)) return map.get(H);

	const below = hues.filter((h) => h < H);
	const above = hues.filter((h) => h > H);

	const low = map.get(Math.max(...(below.length ? below : hues)));
	// ?.[500].H ?? 0;
	const high = map.get(Math.min(...(above.length ? above : hues)));
	// ?.[500].H ?? 0;

	// console.log(getRatio(H, [low?.[ref]?.H??0, high?.[ref]?.H??0], [0, 360]));

	return {
		low,
		high,
		ratio: getRatio(H, [low?.[ref]?.H ?? 0, high?.[ref]?.H ?? 0], [0, 360]),
	};
}

/**@param {number} num @param {[number,number]} interval @param {[number,number]} [circular]*/
function getRatio(num, interval, circular) {
	if (circular && interval[0] > interval[1]) interval[1] += Math.abs(circular[1] - circular[0]);

	const [low, high] = interval.toSorted((a, b) => a - b);

	console.log(low, high);
	// console.log('foo', num < low, num > high, num < low && num > high);
	if (low === high) return 0;
	if (num < low || num > high) throw new Error('number out of bounds');

	return (num - low) / (high - low);
}

console.log(getRatio(3, [2, 7.6], [0, 15]));

findBounds({ 500: { L: 0, C: 0.29, H: 18 } });
