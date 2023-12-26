/** @type {import('@sveltejs/kit').RequestHandler} */
import type { RequestHandler } from '@sveltejs/kit';

import playwright from 'playwright';

const getColors = async (): Promise<Color[]> => {
	const browser: playwright.Browser = await playwright.chromium.launch();

	const page: playwright.Page = await browser.newPage();

	await page.goto('https://tailwindcss.com/docs/customizing-colors');

	const colors: Color[] = await page
		.locator('.flex.flex-col.space-y-3', { hasText: '500'})
		.evaluateAll((colorDIVS: HTMLDivElement[]) =>
			colorDIVS.map((colorDIV) => {
				const name: string = colorDIV.querySelector('.w-16.shrink-0')?.textContent as string;

				const shadeGRID = Array.from(colorDIV.querySelectorAll('.px-0\\.5')) as HTMLDivElement[];

				const shades: BaseShade[] = shadeGRID.map((div) => {
					const level: number = parseInt(div.querySelector(':nth-child(1)')?.textContent as string);

					const hex: string = div.querySelector(':nth-child(2)')?.textContent as string;

					const shade: BaseShade = {
						level,
						hex
					};

					return shade;
				});

				const color: Color = {
					name,
					shades
				};

				return color;
			})
		);

	await browser.close();

	return colors;
};

export const GET: RequestHandler = async () => {
	const colors = await getColors();
	return {
		status: 222,
		body: JSON.stringify(colors)
	};
};
