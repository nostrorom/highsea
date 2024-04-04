import { readFileSync } from 'fs';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import remarkGFM from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeShiki from '@shikijs/rehype';
import { transformerTwoslash } from '@shikijs/twoslash';
import rehypeStringify from 'rehype-stringify';

const render = async (path: string) =>
	(
		await unified()
			.use(remarkParse)
			.use(remarkGFM)
			.use(remarkRehype)
			.use(rehypeSlug)
			.use(rehypeShiki, {
				theme: 'one-dark-pro',
				transformers: [transformerTwoslash({ explicitTrigger: true })],
			})
			.use(rehypeStringify)
			.process(readFileSync(path, 'utf-8'))
	).value.toString();

export default render;
