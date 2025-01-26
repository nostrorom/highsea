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

export { tints, colors, grays, oklchCSS };
