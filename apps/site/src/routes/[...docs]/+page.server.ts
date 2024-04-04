import { join } from 'path';

import render from './md/render';
import structure from './md/structure.json';
import { keys } from '$utils';

export { default as entries } from './md/entries.json';

export const prerender = true;

export const load = async ({ params }) => {
	const [dir, file]: string[] = params.docs.split('/');

	const folder = keys(structure).find((key) => key.slice(3) === dir) as keyof typeof structure;

	console.log(
		join(
			process.cwd(),
			'/src/routes/[...docs]/md',
			folder,
			structure[folder].find((md: string) => md.slice(3, -3) === file) ?? '',
		),
	);
	try {
		return {
			html: await render(
				join(
					process.cwd(),
					'/src/routes/[...docs]/md',
					folder,
					structure[folder].find((md: string) => md.slice(3, -3) === file) ?? '',
				),
			),
		};
	} catch (e) {
		return {
			html: '<h2>Here be dragons</h2><p>🐉</p>',
		};
	}
};
