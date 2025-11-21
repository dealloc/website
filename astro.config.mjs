// @ts-check

import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import {defineConfig} from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import {remarkReadingTime} from './plugins/remark-reading-time.js';

// https://astro.build/config
export default defineConfig({
	site: 'https://example.com',
	integrations: [mdx(), sitemap()],

	vite: {
		plugins: [tailwindcss()],
	},
	markdown: {
		remarkPlugins: [remarkReadingTime],
	},
});
