import { writable, readable, derived } from 'svelte/store';
import baseColors from '../../../static/colors.json';

const allHues = [...Array(360).keys()];
const baseLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

//
// Converter functions
//

const hex2rgb = (hex) => {
	let inBase16 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	let r = parseInt(inBase16[1], 16);
	let g = parseInt(inBase16[2], 16);
	let b = parseInt(inBase16[3], 16);
	return { r, g, b };
};

const rgb2hsl = ({ r, g, b }) => {
	r /= 255;
	g /= 255;
	b /= 255;

	let max = Math.max(r, g, b);
	let min = Math.min(r, g, b);
	let d = max - min;
	let h;

	if (d === 0) h = 0;
	else if (max === r) h = ((((g - b) / d) % 6) + 6) % 6;
	else if (max === g) h = (b - r) / d + 2;
	else if (max === b) h = (r - g) / d + 4;
	let l = (min + max) / 2;

	let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));

	h = Math.round(h * 60);
	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { h, s, l };
};

const hex2hsl = (hex) => {
	let rgb = hex2rgb(hex);
	let hsl = rgb2hsl(rgb);

	return hsl;
};

const hsl2hex = ({ h, s, l }) => {
	l /= 100;
	const a = (s * Math.min(l, 1 - l)) / 100;
	const f = (n) => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, '0');
	};

	let hex = `#${f(0)}${f(8)}${f(4)}`.toUpperCase();

	return hex;
};

export const h2x = readable(hsl2hex);

//
// Color functions
//

const getNames = (colors) => {
	return colors.map((color) => {
		return color.name;
	});
};

const getHues = (colors, reference) => {
	return colors.map((color) => {
		return color.levels.find((level) => {
			return level.id === reference;
		}).hsl.h;
	});
};

const gethuesWithNames = (colors, reference) => {
	return colors.map((color) => {
		return {
			name: color.name,
			hue: color.levels.find((level) => {
				return level.id === reference;
			}).hsl.h
		};
	});
};

const interpolate = (bottomValue, topValue, ratio) => {
	return Math.round(bottomValue + (topValue - bottomValue) * ratio);
};

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

const generateColor = (colors, levels, reference, hue, name) => {
	const { bottomColor, topColor, ratio } = findBoundingColorsAndRatio(colors, reference, hue);

	let newColor;

	if (ratio === 1) {
		newColor = bottomColor;
	} else {
		newColor = { name, type: 'highsea', levels: [], refHue: hue };

		levels.forEach((level) => {
			let bottomHsl = {
				h: bottomColor.levels.find((item) => item.id === level).hsl.h,
				s: bottomColor.levels.find((item) => item.id === level).hsl.s,
				l: bottomColor.levels.find((item) => item.id === level).hsl.l
			};
			let topHsl = {
				h: topColor.levels.find((item) => item.id === level).hsl.h,
				s: topColor.levels.find((item) => item.id === level).hsl.s,
				l: topColor.levels.find((item) => item.id === level).hsl.l
			};
			if (topHsl.h < bottomHsl.h) {
				topHsl.h = topHsl.h + 360;
			}

			let hsl = {
				h: interpolate(bottomHsl.h, topHsl.h, ratio),
				s: interpolate(bottomHsl.s, topHsl.s, ratio),
				l: interpolate(bottomHsl.l, topHsl.l, ratio)
			};

			newColor.levels.push({
				id: level,
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

export const refLevel = writable(500);

export const newName = writable('mycolor');

export const sliderHue = writable(225);

export const newHue = derived(sliderHue, (sliderHue) => {
	return sliderHue % 360;
});

export const tailwindColors = derived(refLevel, (reference) => {
	return baseColors.map((color) => {
		color.type = 'tailwind';
		color.tailwindName = color.name;
		color.levels.forEach((level) => {
			level.hsl = hex2hsl(level.hex);
		});
		color.refHue = color.levels.find((level) => level.id === reference).hsl.h;
		return color;
	});
});

export const colorLevels = writable(baseLevels);

export const allColors = derived([tailwindColors, refLevel], ([colors, reference]) => {
	return allHues.map((i) => {
		return generateColor(colors, baseLevels, reference, i, `color-${i}`);
	});
});

export const paletteColors = writable([]);

export const paletteNames = derived(paletteColors, (colors) => {
	return getNames(colors);
});

export const paletteHues = derived([paletteColors, refLevel], ([colors, reference]) => {
	return getHues(colors, reference);
});

export const newColor = derived([allColors, newHue, newName], ([colors, hue, name]) => {
	let color = colors.find((color) => {
		return color.refHue === hue;
	});
	color.name = name;
	// newName.set(name);

	return color;
});

// export const newColor = derived(
// 	[tailwindColors, refLevel, newHue, newName],
// 	([colors, reference, hue, name]) => {
// 		return generateColor(colors, baseLevels, reference, hue, name);
// 	}
// );

export const colorCodes = derived([newColor, newName], ([newColor, newName]) => {
	let string = `${newName}: {
  `;

	newColor.levels.forEach((level) => {
		if (level.id !== 900) {
			string =
				string +
				`${level.id}: '${level.hex}',
	  `;
		} else {
			string =
				string +
				`${level.id}: '${level.hex}'
	},`;
		}
	});

	return string;
});

// const allStuff = allHues.map((i) => {
// 	// console.log(i);
// 	let name = `All-${i}`;
// 	// return name;

// 	return generateColor(tailwindColors, baseLevels, refLevel, i, name);
// });

// export const allGamut = writable(allStuff);
