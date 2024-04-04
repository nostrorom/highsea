import { readdirSync, writeFileSync } from 'fs';

const dir = `${process.cwd()}/src/routes/[...docs]/md`;

/**  @param {string} path @param {string} path @returns {import('fs').Dirent[]} */
const getContents = (path) => {
	/** @type {import('fs').Dirent[]}*/
	let contents = [];

	try {
		contents = readdirSync(path, {
			encoding: 'utf-8',
			recursive: true,
			withFileTypes: true,
		});
	} catch (error) {
		// no folder or mds
	}
	return contents;
};

const contents = getContents(dir);

const folders = contents
	.filter(/** @param {import('fs').Dirent} item */ (item) => item.isDirectory())
	.map((dir) => dir.name);

const structure = folders.reduce(
	/** @param {Record<string,string[]>} struct @returns {Record<string,string[]>} */
	(struct, folder) => ({
		...struct,
		[folder]: contents
			.filter(
				/** @param {import('fs').Dirent} item */ (item) =>
					item.isFile() && item.name.endsWith('.md') && item.path.includes(folder),
			)
			.map((file) => file.name),
	}),
	{},
);

const entries = contents
	.filter(
		/** @param {import('fs').Dirent} item */ (item) => item.isFile() && item.name.endsWith('.md'),
	)
	.map((file) => `${file.path.split(dir)[1]}/${file.name}`);

writeFileSync(`${dir}/structure.json`, JSON.stringify(structure, null, '\t'));
writeFileSync(`${dir}/entries.json`, JSON.stringify(entries, null, '\t'));
