import { keys } from '../utils';

type HTMLTag =
	| 'h1'
	| 'h2'
	| 'h3'
	| 'h4'
	| 'p'
	| 'a'
	| 'blockquote'
	| 'figure'
	| 'figcaption'
	| 'strong'
	| 'em'
	| 'code'
	| 'pre'
	| 'ol'
	| 'ul'
	| 'li'
	| 'table'
	| 'thead'
	| 'tr'
	| 'th'
	| 'td'
	| 'img'
	| 'video'
	| 'hr';

export type Config = Partial<Record<HTMLTag, string>>;

const config = {
	h1: 'font-bold text-2xl pt-10',
	h2: 'pt-12 pb-4 text-xl font-bold text-indigo-600',
	h3: 'text-2xl pt-6 pb-1 mb-4 border-b border-gray-300 dark:border-gray-800 ',
	h4: 'text-2xl pt-4 pb-2 opacity-50',
	p: 'py-2',
	a: 'text-amber-400 text-indigo-600 hover:border-b border-amber-400 dark:border-indigo-600',
	blockquote: '',
	figure: '',
	figcaption: '',
	strong: 'font-bold',
	em: 'italic',
	code: 'text-gray-200 dark:text-gray-800 text-sm',
	pre: 'my-2 p-4 rounded-md text-sm',
	ol: '',
	ul: 'px-6 py-1 list-disc',
	li: 'opacity-90',
	table: 'rounded-lg bg-gray-500/10 p-4 my-4 w-full',
	thead: 'bg-gray-500/20 rounded-lg',
	tr: '',
	th: 'p-2',
	td: 'p-2 text-center',
	img: '',
	video: '',
	hr: '',
} satisfies Config;

const prosify = (config: Config) =>
	keys(config).reduce(
		(str, k) =>
			`${str} ${config[k]!.split(' ')
				.map((style) => {
					const styles = style.split(':');
					styles.push(`prose-${k}:${styles.pop()}`);
					return styles.join(':');
				})
				.join(' ')}`,
		'',
	);

export const prose = prosify(config);

export const safelist = prose.split(' ');
