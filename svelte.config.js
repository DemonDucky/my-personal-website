import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-cloudflare';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';
import { escapeSvelte } from 'mdsvex';
import remarkToc from 'remark-toc';
import rehypeSlug from 'rehype-slug';

const theme = 'github-dark';
const highlighter = await createHighlighter({
	themes: [theme],
	langs: ['javascript', 'typescript']
});

const dualToc = () => async (tree, file) => {
	// Run once for "table of contents"
	await remarkToc({ heading: 'table of contents' })(tree, file);
	// Run again for "mục lục"
	await remarkToc({ heading: 'mục lục' })(tree, file);
};

/**
 * @typedef {Object} MdsvexOptions
 * @property {string[]} extensions
 * @property {boolean|object} smartypants
 * @property {string|Object.<string, string>} layout
 * @property {Array<Function>|Array<[Function, any]>} remarkPlugins
 * @property {Array<Function>|Array<[Function, any]>} rehypePlugins
 * @property {{ highlighter: Function, alias: Object.<string, string> }} highlight
 * @property {{ parse: Function, marker: string }} frontmatter
 */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(highlighter.codeToHtml(code, { lang, theme }));
			return `{@html \`${html}\` }`;
		}
	},
	remarkPlugins: [dualToc],
	rehypePlugins: [rehypeSlug]
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};

export default config;
