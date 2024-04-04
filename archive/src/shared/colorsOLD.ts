import { writable, readable, derived } from 'svelte/store';
import baseColors from '$json/colors.json';
import baseGrays from '$json/grays.json';

const allHues: number[] = [...Array(360).keys()];
const baseShades: number[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

//
// Converter functions
//

const hex2rgb = (hex: string): RGB => {
	const inBase16: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!inBase16) {
		return { r: 0, g: 0, b: 0 };
	}
	const r: number = parseInt(inBase16[1], 16);
	const g: number = parseInt(inBase16[2], 16);
	const b: number = parseInt(inBase16[3], 16);
	return { r, g, b };
};

const rgb2hsl = (rgb: RGB): HSL => {
	let h: number;
	let s: number;
	let l: number;

	let { r, g, b } = rgb;

	r /= 255;
	g /= 255;
	b /= 255;

	const max: number = Math.max(r, g, b);
	const min: number = Math.min(r, g, b);
	const d: number = max - min;

	if (d === 0) {
		h = 0;
	} else if (max === r) {
		h = ((((g - b) / d) % 6) + 6) % 6;
	} else if (max === g) {
		h = (b - r) / d + 2;
	} else if (max === b) {
		h = (r - g) / d + 4;
	} else {
		h = -1;
	}

	l = (min + max) / 2;

	s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

	h = Math.round(h * 60);
	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { h, s, l };
};

const hex2hsl = (hex: string): HSL => {
	const rgb: RGB = hex2rgb(hex);
	const hsl: HSL = rgb2hsl(rgb);

	return hsl;
};

const hsl2hex = (hsl: HSL): string => {
	const { h, s } = hsl;
	let { l } = hsl;
	l /= 100;

	const a: number = (s * Math.min(l, 1 - l)) / 100;

	const convertToHex = (n: number) => {
		const k: number = (n + h / 30) % 12;
		const color: number = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	const hex: string = `#${convertToHex(0)}${convertToHex(8)}${convertToHex(4)}`.toUpperCase();

	return hex;
};

export const h2x = readable(hsl2hex);
export const x2h = readable(hex2hsl);

//
// Color functions
//

const getNames = (colors) => colors.map((color) => color.name);

const getHues = (colors, reference) =>
	colors.map((color) => color.shades.find((shade) => shade.id === reference).hsl.h);

const gethuesWithNames = (colors, reference) =>
	colors.map((color) => {
		return {
			name: color.name,
			hue: color.shades.find((shade) => {
				return shade.id === reference;
			}).hsl.h
		};
	});

const interpolate = (bottomValue, topValue, ratio) =>
	Math.round(bottomValue + (topValue - bottomValue) * ratio);

const findBoundingColorsAndRatio = (colors, reference, hueValue) => {
	let huesOnly = getHues(colors, reference);
	let huesWithNames = gethuesWithNames(colors, reference);

	// Bottom color info

	let huesBelowValue = huesOnly.filter((hue) => {
		return hue <= hueValue;
	});

	let bottomHue = Math.max(...huesBelowValue);
	let bottomColorName = huesWithNames.find((color) => {
		return color.hue === bottomHue;
	}).name;
	let bottomColor = colors.find((color) => color.name === bottomColorName);

	// Top color info

	let huesAboveValue = huesOnly.filter((hue) => {
		return hue >= hueValue;
	});

	let topHue = 360;
	let topColorName = 'red';

	if (huesAboveValue.length !== 0) {
		topHue = Math.min(...huesAboveValue);
		topColorName = huesWithNames.find((color) => {
			return color.hue === topHue;
		}).name;
	}
	let topColor = colors.find((color) => color.name === topColorName);

	// Ratio info

	let ratio;

	if (topHue - bottomHue === 0) {
		ratio = 1;
	} else {
		ratio = (hueValue - bottomHue) / (topHue - bottomHue);
	}

	return { bottomColor, topColor, ratio };
};

const generateColor = (colors, shades, reference, hue, name) => {
	const { bottomColor, topColor, ratio } = findBoundingColorsAndRatio(colors, reference, hue);

	let newColor;

	if (ratio === 1) {
		newColor = bottomColor;
	} else {
		newColor = { highseaName: name, type: 'highsea', shades: [], refHue: hue };

		shades.forEach((shade) => {
			let bottomHsl = {
				h: bottomColor.shades.find((item) => item.id === shade).hsl.h,
				s: bottomColor.shades.find((item) => item.id === shade).hsl.s,
				l: bottomColor.shades.find((item) => item.id === shade).hsl.l
			};
			let topHsl = {
				h: topColor.shades.find((item) => item.id === shade).hsl.h,
				s: topColor.shades.find((item) => item.id === shade).hsl.s,
				l: topColor.shades.find((item) => item.id === shade).hsl.l
			};
			if (topHsl.h < bottomHsl.h) {
				topHsl.h = topHsl.h + 360;
			}

			let hsl = {
				h: interpolate(bottomHsl.h, topHsl.h, ratio),
				s: interpolate(bottomHsl.s, topHsl.s, ratio),
				l: interpolate(bottomHsl.l, topHsl.l, ratio)
			};

			newColor.shades.push({
				id: shade,
				hsl,
				hex: hsl2hex(hsl)
			});
		});
	}

	return newColor;
};

//
// Exported stores
//

export const refShade = writable(500);

export const newName = writable('');

export const sliderHue = writable(225);

export const newHue = derived(sliderHue, (sliderHue) => {
	return sliderHue % 360;
});

export const tailwindColors = derived(refShade, (reference) =>
	baseColors.map((color) => {
		color.type = 'tailwind';
		color.tailwindName = color.name;
		color.shades.forEach((shade) => {
			shade.hsl = hex2hsl(shade.hex);
		});
		color.refHue = color.shades.find((shade) => shade.id === reference).hsl.h;
		return color;
	})
);

export const tailwindGrays = derived(refShade, (reference) =>
	baseGrays.map((color) => {
		color.type = 'tailwind';
		color.tailwindName = color.name;
		color.shades.forEach((shade) => {
			shade.hsl = hex2hsl(shade.hex);
		});
		color.refHue = color.shades.find((shade) => shade.id === reference).hsl.h;
		return color;
	})
);

export const colorShades = writable(baseShades);

export const allColors = derived([tailwindColors, refShade], ([colors, reference]) =>
	allHues.map((i) => generateColor(colors, baseShades, reference, i, `color_${i}`))
);

export const paletteColors = writable([]);
export const paletteGrays = writable([]);

export const paletteNames = derived(paletteColors, (colors) => getNames(colors));

export const paletteHues = derived([paletteColors, refShade], ([colors, reference]) =>
	getHues(colors, reference)
);

export const newColor = derived([allColors, newHue, newName], ([colors, hue, name]) => {
	let color = { ...colors.find((color) => color.refHue === hue) };
	if (name !== '') {
		color.name = name;
	} else if (color.type === 'tailwind') {
		color.name = color.tailwindName;
	} else {
		color.name = color.highseaName;
	}

	return color;
});

export const colorCodes = derived(newColor, (newColor) => {
	let string = `${newColor.name}: {
  `;

	newColor.shades.forEach((shade) => {
		if (shade.id !== 900) {
			string =
				string +
				`${shade.id}: '${shade.hex}',
	  `;
		} else {
			string =
				string +
				`${shade.id}: '${shade.hex}'
	},`;
		}
	});

	return string;
});
