import { HEX, type HSL } from '@nosdev/codes';
import type { TW } from '$types';

import fs from 'fs';
import { hex } from '$json';
import { keys } from '../utils';

const hsl = keys(hex).reduce(
	(tints, kind) => ({
		...tints,
		[kind]: keys(hex).reduce(
			(colors, name) => ({
				...colors,
				[name]: keys(hex[name]).reduce(
					(shades, shade) => ({
						...shades,
						[shade]: HEX.to.HSL(hex[name][shade]),
					}),
					{} as TW.Range<HSL.Code>,
				),
			}),
			{} as TW.Range<HSL.Code>,
		),
	}),
	{} as Record<keyof typeof hex, TW.Range<HSL.Code>>,
);

// TODO to be used with crawler

fs.writeFileSync('./hsl.json', JSON.stringify(hsl));
