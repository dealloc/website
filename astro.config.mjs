// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import mermaid from 'astro-mermaid';
import {unified} from '@astrojs/markdown-remark';
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import {remarkReadingTime} from './plugins/remark-reading-time.js';

// https://astro.build/config
export default defineConfig({
	site: 'https://dealloc.be',
	// mermaid must come before mdx: it hooks into the markdown pipeline that mdx also consumes.
	integrations: [
		mermaid({
			theme: 'neutral',
			autoTheme: true,
			mermaidConfig: {
				flowchart: {curve: 'basis'},
			},
		}),
		mdx(),
		sitemap(),
	],

	// Posts moved from /blogs/ to /posts/. Keep the old URLs working: on a
	// static build Astro emits meta-refresh stubs with a canonical link.
	redirects: {
		'/blogs': '/posts',
		'/blogs/[...slug]': '/posts/[...slug]',
	},

	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		processor: unified({remarkPlugins: [remarkReadingTime]}),
	},
});
