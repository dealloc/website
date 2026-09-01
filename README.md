# dealloc.be

My personal website — a static Astro site with a blog, a projects showcase, and an about page.
Built with Astro, Tailwind CSS v4, and MDX, and deployed as a fully static build.

Content lives in Markdown/MDX collections:

- `content/blog/` — blog posts (title, description, `pubDate`, optional hero/preview images)
- `content/projects/` — project write-ups (status, technologies, GitHub/live/sponsor links)

Other bits: RSS feed (`/rss.xml`), automatic sitemap, per-post reading time via a custom
remark plugin, and asciinema recordings embedded through `asciinema-player`.

## Project structure

```text
├── content/
│   ├── blog/
│   └── projects/
├── plugins/            # custom remark plugins (reading time)
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── layouts/
│   ├── pages/          # about, claude-code, blogs/, projects/, index, rss.xml.js
│   ├── styles/
│   ├── consts.ts       # site title, description, social links, author bio
│   └── content.config.ts
└── astro.config.mjs
```

## Setup

Requires [Bun](https://bun.sh).

```sh
bun install
bun dev        # local dev server at localhost:4321
```

| Command        | Action                                       |
| :------------- | :------------------------------------------- |
| `bun install`  | Install dependencies                         |
| `bun dev`      | Start local dev server at `localhost:4321`   |
| `bun build`    | Build the production site to `./dist/`       |
| `bun preview`  | Preview the production build locally         |
| `bun astro ...`| Run Astro CLI commands (`astro check`, etc.) |

## Credit

The layout started from Astro's blog starter, itself based on
[Bear Blog](https://github.com/HermanMartinus/bearblog/).
