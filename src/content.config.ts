import {defineCollection} from 'astro:content';
import { z } from 'astro/zod';
import {glob} from 'astro/loaders';

const blog = defineCollection({
    // Load Markdown and MDX files in the `content/blog/` directory.
    loader: glob({base: './content/blog', pattern: '**/*.{md,mdx}'}),
    // Type-check frontmatter using a schema
    schema: ({image}) =>
        z.object({
            title: z.string(),
            description: z.string(),
            // Transform string to Date object
            pubDate: z.coerce.date(),
            updatedDate: z.coerce.date().optional(),
            heroImage: image().optional(),
			maxHeroHeight: z.number().optional(),
			previewImage: image().optional(),
        }),
});

const projects = defineCollection({
    // Load Markdown and MDX files in the `content/projects/` directory.
    loader: glob({base: './content/projects', pattern: '**/*.{md,mdx}'}),
    // Type-check frontmatter using a schema
    schema: ({image}) =>
        z.object({
            title: z.string(),
            description: z.string(),
            startDate: z.coerce.date(),
            endDate: z.coerce.date().optional(),
            status: z.enum(['active', 'completed', 'archived']).default('active'),
            technologies: z.array(z.string()),
            heroImage: image().optional(),
            githubUrl: z.url().optional(),
            liveUrl: z.url().optional(),
            sponsorUrl: z.url().optional(),
        }),
});

export const collections = {blog, projects};
