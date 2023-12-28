import type { TW } from '$types';
import { HEX, type HSL } from '@nosdev/codes';

import _hex from './hex.json';
import _hsl from './hsl.json';

export const hex = _hex satisfies TW.Range<HEX.Code>;
export const hsl = _hsl satisfies TW.Range<HSL.Code>;
