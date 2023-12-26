

export const hex2rgb = (hex: string): RGB => {
	const inBase16: RegExpExecArray | null = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	if (!inBase16) {
		return { r: 0, g: 0, b: 0 };
	}
	const r: number = parseInt(inBase16[1], 16);
	const g: number = parseInt(inBase16[2], 16);
	const b: number = parseInt(inBase16[3], 16);
	return { r, g, b };
};

export const rgb2hsl = (rgb: RGB): HSL => {
	let h: number;
	let s: number;
	let l: number;

	let { r, g, b } = rgb;

	r /= 255;
	g /= 255;
	b /= 255;

	const max: number = Math.max(r, g, b);
	const min: number = Math.min(r, g, b);
	const diff: number = max - min;

	if (diff === 0) {
		h = 0;
	} else if (max === r) {
		h = ((((g - b) / diff) % 6) + 6) % 6;
	} else if (max === g) {
		h = (b - r) / diff + 2;
	} else if (max === b) {
		h = (r - g) / diff + 4;
	} else {
		h = -1;
	}

	l = (min + max) / 2;

	s = diff === 0 ? 0 : diff / (1 - Math.abs(2 * l - 1));

	h = Math.round(h * 60);
	s = Math.round(s * 100);
	l = Math.round(l * 100);

	return { h, s, l };
};

// const hex2hsl = (hex: string): HSL => {
// 	const rgb: RGB = hex2rgb(hex);
// 	const hsl: HSL = rgb2hsl(rgb);

// 	return hsl;
// };

export const hex2hsl = (hex: string): HSL => rgb2hsl(hex2rgb(hex));

export const hsl2hex = (hsl: HSL): string => {
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

