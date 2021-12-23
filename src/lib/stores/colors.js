import { writable, readable, derived } from 'svelte/store';

// Converter functions

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

// Color arrays

export const baseColors = writable([]);
export const refLevel = writable(500);

export const sliderHue = writable(355);
export const newHue = derived(sliderHue, (sliderHue, set) => {
	set(sliderHue % 360);
});

export const colors = derived([baseColors, refLevel], ([baseColors, refLevel], set) => {
	let newColors = baseColors;
	if (baseColors.length !== 0) {
		newColors.forEach((color) => {
			color.levels.forEach((level) => {
				level.hsl = hex2hsl(level.hex);
			});
			color.refHue = color.levels.find((level) => level.id === refLevel).hsl.h;
		});
	}
	set(newColors);
});

export const refHues = derived([baseColors, refLevel], ([baseColors, refLevel], set) => {
	let list = [];
	baseColors.forEach((color) => {
		let levels = color.levels;

		levels.forEach((level) => {
			if (level.id === refLevel) {
				list.push({
					id: color.id,
					hue: level.hsl.h
				});
			}
		});
	});

	set(list);
});

const findBoundingColorsAndRatio = (colors, hueArray, hueValue) => {
	let huesOnly = [];

	hueArray.forEach((color) => {
		huesOnly.push(color.hue);
	});

	let huesBelowValue = huesOnly.filter((color) => {
		return color <= hueValue;
	});
	let bottomHue = Math.max(...huesBelowValue);
	let bottomColorID = hueArray.find((color) => {
		return color.hue === bottomHue;
	}).id;
	let bottomColor = colors.find((color) => color.id === bottomColorID);

	let huesAboveValue = huesOnly.filter((hue) => {
		return hue >= hueValue;
	});

	let topHue = 360;
	let topColorID = 'red';
	if (huesAboveValue.length !== 0) {
		topHue = Math.min(...huesAboveValue);
		topColorID = hueArray.find((color) => {
			return color.hue === topHue;
		}).id;
	}
	let topColor = colors.find((color) => color.id === topColorID);

	let ratio;

	if (topHue - bottomHue === 0) {
		ratio = 1;
	} else {
		ratio = (hueValue - bottomHue) / (topHue - bottomHue);
	}

	return { bottomColor, topColor, ratio };
};

export const boundingColors = derived(
	[colors, refHues, newHue],
	([colors, refHues, newHue], set) => {
		let bounds = findBoundingColorsAndRatio(colors, refHues, newHue);

		let bottomColor = bounds.bottomColor;
		let topColor = bounds.topColor;

		set({ bottomColor, topColor });
	}
);

export const boundingRatio = derived(
	[colors, refHues, newHue],
	([colors, refHues, newHue], set) => {
		let bounds = findBoundingColorsAndRatio(colors, refHues, newHue);

		let ratio = bounds.ratio;

		set(ratio);
	}
);

export const newName = writable('mycolor');

const generateColor = ({ bottomColor, topColor }, ratio, newHue, newName) => {
	let refLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
	let newColor = { id: newName, levels: [], refHue: newHue };

	const interpolate = (bottomValue, topValue, ratio) => {
		return Math.round(bottomValue + (topValue - bottomValue) * ratio);
	};

	refLevels.forEach((level) => {
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
			hex: hsl2hex(hsl),
			hsl
		});
	});

	return newColor;
};

export const newColor = derived(
	[boundingColors, boundingRatio, newHue, newName],
	([boundingColors, boundingRatio, newHue, newName], set) => {
		set(generateColor(boundingColors, boundingRatio, newHue, newName));
	}
);

export const colorCodes = derived([newColor, newName], ([newColor, newName], set) => {
	let string = `'${newName}': {
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
}`;
		}
	});

	set(string);
});
