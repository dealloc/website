import { getCollection } from 'astro:content';
import rss from '@astrojs/rss';
import { SITE_DESCRIPTION, SITE_TITLE } from '../consts';

export async function GET(context) {
	const posts = await getCollection('blog');
	return rss({
		title: SITE_TITLE,
		description: SITE_DESCRIPTION,
		site: context.site,
		items: posts.map((post) => ({
			...post.data,
			link: `/posts/${post.id}/`,
			// @astrojs/rss derives <guid> from `link`, so the /blogs -> /posts
			// move would change every guid and make feed readers re-surface
			// every post as new. Pin a stable, path-independent guid instead.
			customData: `<guid isPermaLink="false">${post.id}</guid>`,
		})),
	});
}
