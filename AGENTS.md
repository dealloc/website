# Personal Website - Technical Specification & Design System

**Project:** Wannes Gennar Personal Website
**Stack:** Astro + TailwindCSS v4 + MDX
**Goal:** Professional personal brand with blog-first focus
**Target Audience:** Fellow developers & tech peers
**Tone:** Professional & polished, technically deep

---

## 📋 Table of Contents

1. [Strategic Overview](#strategic-overview)
2. [Design System](#design-system)
3. [Information Architecture](#information-architecture)
4. [UI/UX Specifications](#uiux-specifications)
5. [Component Library](#component-library)
6. [Content Strategy](#content-strategy)
7. [Technical Architecture](#technical-architecture)
8. [Performance Requirements](#performance-requirements)
9. [Accessibility Standards](#accessibility-standards)
10. [Implementation Roadmap](#implementation-roadmap)

---

## 🎯 Strategic Overview

### Brand Positioning
- **Who:** Wannes Gennar - Full-stack .NET engineer with expertise in Rust, Elixir, and modern web technologies
- **Company:** Elixus (https://www.elixus.be)
- **Product:** Meshum (https://www.meshum.dev) - Unified knowledge layer for teams
- **Value Proposition:** Technical expertise, thought leadership, innovative solutions

### Primary Goals
1. **Drive blog readership** - Most visitors expected for blog content
2. **Showcase projects** - Highlight Meshum and other significant work
3. **Build personal brand** - Establish credibility and expertise
4. **Avoid "AI slop" perception** - Professional, intentional design choices

### User Journey
```
Google Search → Blog Post → More Posts → Projects → About/Contact
```

Primary CTA: **Read the blog**

---

## 🎨 Design System

### Visual Style Guide

**Established Homepage Design (January 2025):**
- **Primary color scheme:** Blue to purple gradients (avoid overwhelming purple/"AI slop" look)
- **Headline style:** Large, bold gradient text with subtle animation (8s ease infinite)
- **Accent elements:** Colorful badges and buttons with individual color identities
- **Background effects:** Subtle blur gradients for depth without distraction
- **Interaction design:** Hover effects with scale + shadows on interactive elements
- **Animation philosophy:** Subtle, slow, professional - not flashy

### Color Palette

Based on Meshum's brand colors, adapted for personal site with light/dark mode support.

**Design Approach:** Light mode is the default theme, with dark mode as an override via `@media (prefers-color-scheme: dark)` or `dark:` Tailwind prefix. Light theme uses vibrant gradients and brand colors to avoid blandness.

**Established Color Usage (Homepage):**
- **Headline gradient:** Blue → Blue → Purple (from-blue-500 via-blue-600 to-purple-600 in light, from-blue-400 via-blue-500 to-purple-500 in dark)
- **Badge gradient:** Blue → Purple (from-blue-500 to-purple-500)
- **Background blurs:** Blue (blue-400/20 or blue-500/10) and Purple (purple-400/20 or purple-500/10)
- **Link buttons:** Individual gradients - blue (from-blue-600 to-blue-500), purple (from-purple-600 to-purple-500), neutral (from-gray-700 to-gray-600)

#### Light Mode (Default)

```css
/* Background layers */
--color-bg-light: oklch(98% .005 254);    /* Primary background */
--color-bg-surface: oklch(100% 0 0);      /* Elevated surfaces (white) */
--color-bg-elevated: oklch(96% .005 254); /* Slightly elevated */

/* Brand colors - vibrant for visual interest */
--color-primary: oklch(52% .22 310);      /* Purple/magenta - strong presence */
--color-accent: oklch(48% .20 200);       /* Cyan/light blue - energetic accent */

/* Text hierarchy */
--color-text-dark: oklch(20% .01 254);    /* Primary text */
--color-text-gray: oklch(40% .06 254);    /* Secondary text */
--color-text-muted: oklch(55% .04 254);   /* Tertiary/subtle text */

/* Functional colors */
--color-border: oklch(85% .01 254);       /* Borders and dividers */
--color-hover: oklch(92% .005 254);       /* Hover states */

/* Gradients - for hero sections and accents */
--gradient-brand: linear-gradient(135deg, var(--color-primary), var(--color-accent));
--gradient-subtle: linear-gradient(135deg, oklch(98% .01 310), oklch(98% .01 200));
```

#### Dark Mode (Override)

Applied via `@media (prefers-color-scheme: dark)` or Tailwind's `dark:` prefix.

```css
/* Background layers */
--color-bg-darker: oklch(10% .04 254);    /* Deepest background */
--color-bg-dark: oklch(15% .05 254);      /* Primary background */
--color-bg-surface: oklch(20% .04 254);   /* Elevated surfaces */

/* Brand colors */
--color-primary: oklch(62% .25 310);      /* Purple/magenta - Meshum primary */
--color-accent: oklch(58% .24 200);       /* Cyan/light blue - Accent */

/* Text hierarchy */
--color-text-white: oklch(95% .01 254);   /* Primary text */
--color-text-gray: oklch(70% .08 254);    /* Secondary text */
--color-text-muted: oklch(55% .06 254);   /* Tertiary/subtle text */

/* Functional colors */
--color-border: oklch(30% .03 254);       /* Borders and dividers */
--color-hover: oklch(25% .04 254);        /* Hover states */
```

### Typography

#### Font Families
```css
--font-sans: 'Inter', system-ui, -apple-system, sans-serif;
--font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
--font-mono: ui-monospace, 'SF Mono', 'Cascadia Code', 'Roboto Mono', monospace;
```

**Usage:**
- **Headings:** Montserrat (bold, geometric, professional)
- **Body text:** Inter (excellent readability)
- **Code:** System monospace (performance)

#### Font Scale (Tailwind-compatible)

```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px - body default */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 30px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px - hero headings */
```

#### Line Heights
```css
--leading-tight: 1.25;    /* Headings */
--leading-normal: 1.5;    /* UI text */
--leading-relaxed: 1.6;   /* Blog content */
```

#### Font Weights
```css
--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Spacing Scale

```css
--spacing-xs: 0.25rem;    /* 4px */
--spacing-sm: 0.5rem;     /* 8px */
--spacing-md: 0.75rem;    /* 12px */
--spacing-base: 1rem;     /* 16px */
--spacing-lg: 1.5rem;     /* 24px */
--spacing-xl: 2rem;       /* 32px */
--spacing-2xl: 3rem;      /* 48px */
--spacing-3xl: 4rem;      /* 64px */
--spacing-4xl: 6rem;      /* 96px */
```

### Border Radius

```css
--radius-sm: 0.25rem;     /* 4px - small elements */
--radius-md: 0.5rem;      /* 8px - buttons, cards */
--radius-lg: 0.75rem;     /* 12px - larger cards */
--radius-xl: 1rem;        /* 16px - hero sections */
```

### Shadows

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

### Transitions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 🏗 Information Architecture

### Site Structure

```
/                           # Homepage
├── Hero section
├── Recent blog posts (3)
├── Featured projects
└── About callout

/blog                       # Blog index
├── All posts (chronological)
└── Future: Tag filtering

/blog/[slug]                # Individual blog post
├── Hero image (optional)
├── Article content
├── Table of contents (long posts)
└── Related posts

/projects                   # Projects grid
└── Featured + all projects

/projects/[slug]            # Individual project page
├── Hero
├── Description
├── Tech stack
└── Case study (optional)
```

### Navigation

**Primary Navigation (Header):**
- Logo/Name (left)
- Blog (center-right)
- Projects (right)

**Footer:**
- Copyright
- Social links (GitHub, LinkedIn, etc.)
- RSS feed link
- Back to top

**No hamburger menu needed** - Only 2 navigation items

---

## 💻 UI/UX Specifications

## 🧩 Component Library

### Established Component Patterns (Homepage)

#### Gradient Text Badge
```astro
<!-- Used for role/title with strong visual emphasis -->
<span class="inline-block px-4 py-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg shadow-lg">
  Software Engineer
</span>
```

#### Gradient Text Button/Link
```astro
<!-- Button with gradient text (not background) -->
<a
  href="/path"
  class="group px-6 py-3 bg-gray-100 dark:bg-gray-900 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
>
  <span class="bg-gradient-to-r from-blue-600 to-blue-500 dark:from-blue-400 dark:to-blue-300 bg-clip-text text-transparent">
    Link Text
  </span>
</a>
```

#### Animated Gradient Headline
```astro
<!-- Large headline with animated gradient -->
<h1 class="text-7xl md:text-9xl font-black tracking-tight bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 dark:from-blue-400 dark:via-blue-500 dark:to-purple-500 bg-clip-text text-transparent animate-gradient drop-shadow-2xl" style="font-family: 'Montserrat', sans-serif; background-size: 200% 200%;">
  Your Name
</h1>
```

#### Background Blur Effects
```astro
<!-- Subtle background gradients for depth -->
<div class="absolute inset-0 -z-10">
  <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 dark:bg-blue-500/10 rounded-full blur-3xl"></div>
  <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 dark:bg-purple-500/10 rounded-full blur-3xl"></div>
</div>
```

### Layout Components

#### Header.astro
```astro
<header class="sticky top-0 bg-bg-dark/80 backdrop-blur z-50">
  <nav class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="font-display font-bold text-xl">Wannes</a>
    <div class="flex gap-8">
      <a href="/blog">Blog</a>
      <a href="/projects">Projects</a>
    </div>
  </nav>
</header>
```

**Features:**
- Sticky on scroll
- Semi-transparent background with blur
- Mobile-responsive (no hamburger needed)
- Active link indicator

#### Footer.astro
```astro
<footer class="border-t border-border mt-auto">
  <div class="max-w-7xl mx-auto px-4 py-12">
    <div class="flex justify-between items-center">
      <p class="text-muted">© 2025 Wannes Gennar</p>
      <div class="flex gap-6">
        <a href="https://github.com/...">GitHub</a>
        <a href="...">LinkedIn</a>
        <a href="/rss.xml">RSS</a>
      </div>
    </div>
  </div>
</footer>
```

#### BaseLayout.astro (Enhanced)
- Current layout works well
- Import Header and Footer
- Add theme toggle script (if implementing)

### Content Components

#### BlogCard.astro
```typescript
interface Props {
  title: string;
  description: string;
  pubDate: Date;
  slug: string;
  readTime?: number;
}
```

**Styling:**
- Card with hover effect (subtle lift + border glow)
- Typography hierarchy: title (xl), description (base), meta (sm)
- Motion-safe animations

#### ProjectCard.astro
```typescript
interface Props {
  name: string;
  description: string;
  image: string;
  techStack: string[];
  link: string;
  featured?: boolean;
}
```

**Styling:**
- Larger card if featured
- Image with overlay on hover
- Tech stack tags at bottom
- External link indicator

#### Button.astro
```typescript
interface Props {
  variant?: 'primary' | 'secondary' | 'ghost';
  href?: string;
  class?: string;
}
```

**Variants:**
- Primary: Gradient background, white text
- Secondary: Border, transparent background
- Ghost: No background, subtle hover

#### Tag.astro
```typescript
interface Props {
  label: string;
  variant?: 'default' | 'accent';
}
```

**Usage:** Tech stack, blog tags

### Utility Components

#### FormattedDate.astro (Existing)
- Already implemented
- Good as-is

#### ReadTime.astro
```typescript
interface Props {
  minutes: number;
}
```

Calculate from content length or frontmatter.

#### TableOfContents.astro
```typescript
interface Props {
  headings: { depth: number; text: string; slug: string }[];
}
```

Generated from markdown headings, sticky on desktop.

---

## 📝 Content Strategy

### Content Collections Schema

#### Blog Collection
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});
```

#### Projects Collection
```typescript
const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './content/projects' }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    heroImage: z.string(),
    techStack: z.array(z.string()),
    link: z.string().url(),
    featured: z.boolean().default(false),
    order: z.number().default(999),
  }),
});

export const collections = { blog, projects };
```

### Initial Content

#### Blog Posts
1. Transfer existing `markdown-style-guide.md`
2. Create 2-3 technical blog posts showcasing expertise
3. Topics: .NET, Rust, Elixir, architecture, etc.

#### Project Pages

**Meshum (Featured)**
```markdown
---
name: Meshum
description: Unified knowledge layer where teams keep using their tools—everything becomes searchable through AI agents
heroImage: /images/meshum-hero.png
techStack: [".NET", "TypeScript", "PostgreSQL", "Redis", "OpenAI"]
link: https://www.meshum.dev
featured: true
order: 1
---

# Meshum Case Study

## The Problem
[Detailed problem description]

## The Solution
[Technical architecture, decisions]

## Results
[Impact, metrics, learnings]
```

Create similar pages for 2-3 other projects.

### Content Guidelines

**Blog Posts:**
- Title: Clear, descriptive, SEO-friendly
- Description: 120-160 characters (for meta tags)
- Hero images: 1200x630px (Open Graph compatible)
- Content: Technical depth, code examples, real-world insights
- Length: 1000-3000 words (5-15 min read)
- Voice: Professional but approachable, first-person OK

**Project Pages:**
- Focus on problem/solution/impact
- Technical stack front and center
- Link to live product
- Optional: Case study content for major projects

---

## 🏛 Technical Architecture

### File Structure

```
/Users/dealloc/Documents/Personal/personal-website/
├── AGENTS.md                          # This file
├── README.md
├── astro.config.mjs
├── package.json
├── tsconfig.json
├── .editorconfig
├── .gitignore
│
├── public/
│   ├── favicon.svg
│   ├── wannes.jpg                     # Professional photo
│   ├── robots.txt
│   └── images/                        # Project images, hero images
│
├── content/
│   ├── blog/                          # Blog posts (MD/MDX)
│   │   ├── first-post.md
│   │   ├── second-post.md
│   │   └── ...
│   └── projects/                      # Project pages (MD/MDX)
│       ├── meshum.md
│       ├── project-2.md
│       └── ...
│
└── src/
    ├── assets/                        # Optimized images (Astro Image)
    │
    ├── components/
    │   ├── FormattedDate.astro        # ✅ Exists
    │   ├── Tracking.astro             # ✅ Exists
    │   ├── Header.astro               # ⚠️ Create
    │   ├── Footer.astro               # ⚠️ Create
    │   ├── BlogCard.astro             # ⚠️ Create
    │   ├── ProjectCard.astro          # ⚠️ Create
    │   ├── Button.astro               # ⚠️ Create
    │   ├── Tag.astro                  # ⚠️ Create
    │   ├── ReadTime.astro             # ⚠️ Create
    │   └── TableOfContents.astro      # ⚠️ Create (optional)
    │
    ├── layouts/
    │   ├── BaseLayout.astro           # ✅ Exists (enhance)
    │   ├── BlogPost.astro             # ⚠️ Create
    │   └── ProjectPage.astro          # ⚠️ Create
    │
    ├── pages/
    │   ├── index.astro                # ⚠️ Rebuild (currently "Hello world")
    │   ├── blog/
    │   │   ├── index.astro            # ⚠️ Fix (broken references)
    │   │   └── [...slug].astro        # ⚠️ Fix
    │   ├── projects/
    │   │   ├── index.astro            # ⚠️ Create
    │   │   └── [...slug].astro        # ⚠️ Create
    │   └── rss.xml.js                 # ⚠️ Fix (missing consts)
    │
    ├── styles/
    │   └── global.css                 # ⚠️ Expand (add design system)
    │
    ├── utils/                         # ⚠️ Create
    │   ├── readTime.ts                # Calculate reading time
    │   └── formatDate.ts              # Date utilities
    │
    ├── consts.ts                      # ⚠️ Create (site metadata)
    └── content.config.ts              # ⚠️ Update (add projects)
```

### Key Files to Create/Fix

#### src/consts.ts
```typescript
export const SITE_TITLE = 'Wannes Gennar';
export const SITE_DESCRIPTION = 'Full-stack .NET engineer exploring Rust, Elixir, and modern web technologies. Founder of Elixus, creator of Meshum.';
export const SITE_URL = 'https://wannesgennar.com'; // Update with actual domain

export const SOCIAL_LINKS = {
  github: 'https://github.com/...',
  linkedin: 'https://linkedin.com/in/...',
  email: 'mailto:...',
};

export const AUTHOR = {
  name: 'Wannes Gennar',
  bio: 'Full-stack .NET engineer with a passion for building scalable systems. Founder of Elixus, currently building Meshum—a unified knowledge layer for software teams.',
  company: 'Elixus',
  companyUrl: 'https://www.elixus.be',
};
```

#### src/styles/global.css
```css
@import 'tailwindcss';

/* ============================================
   Design System - CSS Variables
   ============================================ */

:root {
  /* Colors - Light Mode (Default) */
  --color-bg-light: oklch(98% .005 254);
  --color-bg-surface: oklch(100% 0 0);
  --color-bg-elevated: oklch(96% .005 254);

  /* Brand colors - vibrant for visual interest */
  --color-primary: oklch(52% .22 310);
  --color-accent: oklch(48% .20 200);

  --color-text-dark: oklch(20% .01 254);
  --color-text-gray: oklch(40% .06 254);
  --color-text-muted: oklch(55% .04 254);

  --color-border: oklch(85% .01 254);
  --color-hover: oklch(92% .005 254);

  /* Gradients - for hero sections and accents */
  --gradient-brand: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  --gradient-subtle: linear-gradient(135deg, oklch(98% .01 310), oklch(98% .01 200));

  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Montserrat', system-ui, -apple-system, sans-serif;
  --font-mono: ui-monospace, 'SF Mono', monospace;

  /* Spacing (reference Tailwind's scale) */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 0.75rem;
  --spacing-base: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  --spacing-2xl: 3rem;
  --spacing-3xl: 4rem;
  --spacing-4xl: 6rem;

  /* Border Radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;

  /* Transitions */
  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-base: 200ms cubic-bezier(0.4, 0, 0.2, 1);
  --transition-slow: 300ms cubic-bezier(0.4, 0, 0.2, 1);

  /* Shadows */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
}

/* Dark mode (Override) */
@media (prefers-color-scheme: dark) {
  :root {
    /* Background layers */
    --color-bg-darker: oklch(10% .04 254);
    --color-bg-dark: oklch(15% .05 254);
    --color-bg-surface: oklch(20% .04 254);

    /* Brand colors */
    --color-primary: oklch(62% .25 310);
    --color-accent: oklch(58% .24 200);

    /* Text hierarchy */
    --color-text-white: oklch(95% .01 254);
    --color-text-gray: oklch(70% .08 254);
    --color-text-muted: oklch(55% .06 254);

    /* Functional colors */
    --color-border: oklch(30% .03 254);
    --color-hover: oklch(25% .04 254);
  }
}

/* Base Styles */
body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-light);
  color: var(--color-text-dark);
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: var(--color-bg-dark);
    color: var(--color-text-white);
  }
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 700;
  line-height: 1.25;
}

/* Blog Content Styles */
.prose {
  max-width: 720px;
  margin: 0 auto;
  line-height: 1.6;
}

.prose h1 { font-size: 2.25rem; margin-top: 2rem; margin-bottom: 1rem; }
.prose h2 { font-size: 1.875rem; margin-top: 1.75rem; margin-bottom: 0.875rem; }
.prose h3 { font-size: 1.5rem; margin-top: 1.5rem; margin-bottom: 0.75rem; }
.prose p { margin-bottom: 1.25rem; }
.prose a {
  color: var(--color-accent);
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-underline-offset: 2px;
  transition: text-decoration-color var(--transition-fast);
}
.prose a:hover {
  text-decoration-color: var(--color-primary);
}

.prose code {
  font-family: var(--font-mono);
  font-size: 0.875em;
  padding: 0.125rem 0.25rem;
  background-color: var(--color-hover);
  border-radius: var(--radius-sm);
}

.prose pre {
  padding: 1rem;
  border-radius: var(--radius-md);
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose pre code {
  padding: 0;
  background-color: transparent;
}

/* Animations (Motion-safe) */
@media (prefers-reduced-motion: no-preference) {
  .animate-fade-in {
    animation: fadeIn var(--transition-slow) ease-in;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .animate-gradient {
    background-size: 200% 200%;
    animation: gradientShift 8s ease infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }
}

/* Hover effects */
.card-hover {
  transition: transform var(--transition-base), box-shadow var(--transition-base);
}

@media (prefers-reduced-motion: no-preference) {
  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-xl);
  }
}
```

### Dependencies (Current)

✅ Already installed:
- astro: ^5.16.0
- @astrojs/mdx: ^4.3.12
- @astrojs/sitemap: ^3.6.0
- @astrojs/rss: ^4.0.14
- @tailwindcss/vite: ^4.1.17
- tailwindcss: ^4.1.17
- sharp: ^0.34.3 (image optimization)

No additional packages needed!

---

## ⚡️ Performance Requirements

### Lighthouse Score Targets
- **Performance:** 95+
- **Accessibility:** 100
- **Best Practices:** 100
- **SEO:** 100

### Core Web Vitals
- **LCP (Largest Contentful Paint):** < 2.5s
- **FID (First Input Delay):** < 100ms
- **CLS (Cumulative Layout Shift):** < 0.1
- **FCP (First Contentful Paint):** < 1.5s
- **TTI (Time to Interactive):** < 3.5s

### Performance Checklist

#### Fonts
- [x] Google Fonts loaded (Montserrat + Inter)
- [ ] Add `font-display: swap` (already in Google Fonts URL)
- [ ] Preconnect to fonts.googleapis.com and fonts.gstatic.com
- [ ] Consider font subsetting for production
- [ ] Preload critical font files

#### Images
- [ ] Use Astro's `<Image>` component for optimization
- [ ] Lazy load images below fold
- [ ] AVIF/WebP formats with fallbacks
- [ ] Proper width/height attributes (prevent CLS)
- [ ] Preload hero images
- [ ] Optimize hero image (1200x630px max)

#### JavaScript
- [x] Minimal JS (Astro islands architecture)
- [ ] No client-side JS unless essential
- [ ] If needed, use `client:idle` or `client:visible` directives
- [ ] Analytics script (Tracking.astro) already optimized

#### CSS
- [x] TailwindCSS v4 (smaller bundle)
- [ ] Critical CSS inlined (Astro handles this)
- [ ] CSS variables for theming (no JS toggle needed)
- [ ] Remove unused styles (Astro does this)

#### Build Optimization
- [ ] Enable Astro's compression
- [ ] Minify HTML, CSS, JS
- [ ] Generate sitemap (already configured)
- [ ] Proper caching headers

#### Rendering Strategy
- [x] Static site generation (SSG) by default
- [ ] Prerender all pages
- [ ] No server-side rendering needed

---

## ♿️ Accessibility Standards

### WCAG 2.1 Level AA Compliance

#### Color Contrast
- [ ] All text meets 4.5:1 contrast ratio (7:1 for large text)
- [ ] Use online contrast checker tools
- [ ] Test both light and dark modes
- [ ] Ensure link colors have sufficient contrast

#### Keyboard Navigation
- [ ] All interactive elements focusable
- [ ] Visible focus indicators
- [ ] Logical tab order
- [ ] Skip to main content link
- [ ] No keyboard traps

#### Semantic HTML
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] Landmark regions (header, nav, main, footer)
- [ ] Lists for navigation and blog posts
- [ ] Descriptive link text (avoid "click here")
- [ ] Alt text for all images

#### ARIA (When Needed)
- [ ] aria-label for icon-only buttons
- [ ] aria-current for active navigation
- [ ] aria-expanded for expandable elements
- [ ] Don't over-use ARIA (semantic HTML first)

#### Forms (If Added)
- [ ] Label all inputs
- [ ] Group related inputs
- [ ] Error messages associated with inputs
- [ ] Required field indicators

#### Motion & Animation
- [x] Respect `prefers-reduced-motion`
- [ ] All animations wrapped in media query
- [ ] Provide alternative UI if motion disabled
- [ ] No auto-playing videos

#### Screen Reader Testing
- [ ] Test with VoiceOver (macOS)
- [ ] Test with NVDA (Windows)
- [ ] Logical reading order
- [ ] Descriptive page titles

### Accessibility Checklist

```bash
# Tools to use:
- axe DevTools (Chrome/Firefox extension)
- Lighthouse accessibility audit
- WAVE (WebAIM's evaluation tool)
- Color contrast checker
- Keyboard-only navigation testing
```

---

## 🎨 Animation Specifications

### Principle: High-Impact, Minimal

Focus on 2-3 key animations rather than scattered micro-interactions.

**Established Patterns (Homepage):**
- Headline text gradient animation: 8s ease infinite
- Button hover: scale(1.05) + shadow-lg
- Smooth transitions: 200-300ms for all interactive elements
- Background blurs: Static (no animation to avoid distraction)

### 1. Hero Gradient Animation

**Location:** Homepage hero section (headline text)
**Effect:** Subtle, slow-moving gradient on text
**Implementation:** Pure CSS, respects motion preferences
**Duration:** 8 seconds (slow, professional feel)

```css
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 8s ease infinite;
}

@keyframes gradient {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

### 2. Button/Card Hover Effects

**Location:** Interactive buttons, blog cards, project cards
**Effect:** Subtle lift + glow on hover
**Performance:** Uses `transform` and `box-shadow` only

**Established pattern (Homepage buttons):**
```css
/* Button style */
.button {
  transition: all 200ms ease;
  /* bg-gray-100 dark:bg-gray-900 rounded-lg px-6 py-3 */
}

@media (prefers-reduced-motion: no-preference) {
  .button:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1);
  }
}

/* Card style */
.card {
  transition: transform 200ms ease, box-shadow 200ms ease;
  border: 1px solid var(--color-border);
}

@media (prefers-reduced-motion: no-preference) {
  .card:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1);
    border-color: var(--color-accent);
  }
}
```

### 3. Page Entry Animation

**Location:** Main content on page load
**Effect:** Fade in + slide up
**Implementation:** CSS animation, motion-safe

```css
@media (prefers-reduced-motion: no-preference) {
  .animate-on-load {
    animation: fadeInUp 600ms ease-out;
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

### 4. Link Underline Animation

**Location:** All text links
**Effect:** Animated underline on hover
**Performance:** Uses `text-decoration-color`

```css
a {
  text-decoration: underline;
  text-decoration-color: var(--color-accent);
  text-underline-offset: 2px;
  transition: text-decoration-color 150ms ease;
}

a:hover {
  text-decoration-color: var(--color-primary);
}
```

### Motion Preference Handling

**Always wrap animations:**
```css
@media (prefers-reduced-motion: no-preference) {
  /* Animations here */
}
```

**Fallback for reduced motion:**
- Instant transitions
- No transforms
- Immediate state changes

---

## 🗺 Implementation Roadmap

### Phase 1: Foundation (Priority: High)

**Goal:** Fix broken references, establish design system

1. **Create missing files**
   - [ ] `src/consts.ts` - Site metadata
   - [ ] `src/components/Header.astro` - Navigation
   - [ ] `src/components/Footer.astro` - Footer with social links
   - [ ] `src/utils/readTime.ts` - Reading time calculator

2. **Update global.css**
   - [ ] Add all CSS variables (colors, typography, spacing)
   - [ ] Define base styles
   - [ ] Add `.prose` styles for blog content
   - [ ] Add animation keyframes with motion-safe wrappers

3. **Fix broken pages**
   - [ ] Update `src/pages/rss.xml.js` - Import SITE_TITLE/DESCRIPTION from consts
   - [ ] Update `src/pages/blog/index.astro` - Remove broken imports, use Header/Footer
   - [ ] Update `src/pages/blog/[...slug].astro` - Proper blog post layout

4. **Update content collections**
   - [ ] Extend blog schema (add tags, draft flag)
   - [ ] Create projects collection schema
   - [ ] Update `src/content.config.ts`

**Deliverable:** Site builds without errors, basic structure in place

---

### Phase 2: Core Pages (Priority: High)

**Goal:** Build homepage, blog, and projects pages

1. **Homepage (`src/pages/index.astro`)**
   - [ ] Hero section with gradient
   - [ ] Fetch 3 most recent blog posts
   - [ ] Display featured projects
   - [ ] About section with photo

2. **Blog pages**
   - [ ] Create `src/layouts/BlogPost.astro` layout
   - [ ] Update blog/index.astro with proper list
   - [ ] Update blog/[...slug].astro with BlogPost layout
   - [ ] Add reading time calculation

3. **Projects pages**
   - [ ] Create `src/pages/projects/index.astro`
   - [ ] Create `src/pages/projects/[...slug].astro`
   - [ ] Create `src/layouts/ProjectPage.astro`

4. **Update BaseLayout.astro**
   - [ ] Import Header and Footer
   - [ ] Enhance SEO meta tags
   - [ ] Add proper Open Graph images

**Deliverable:** All core pages functional and styled

---

### Phase 3: Components & Polish (Priority: Medium)

**Goal:** Reusable components, enhanced UX

1. **Create content components**
   - [ ] `BlogCard.astro` - Blog post card with hover effect
   - [ ] `ProjectCard.astro` - Project card with tech stack
   - [ ] `Button.astro` - Reusable button (primary, secondary, ghost)
   - [ ] `Tag.astro` - Tech stack tags / blog tags

2. **Optional components**
   - [ ] `TableOfContents.astro` - For long blog posts
   - [ ] `ReadTime.astro` - Display reading time
   - [ ] `SocialShare.astro` - Social share buttons (if desired)

3. **Add animations**
   - [ ] Hero gradient animation
   - [ ] Card hover effects
   - [ ] Page entry animations
   - [ ] Link underline animations
   - [ ] All wrapped in motion-safe media queries

4. **Enhance typography**
   - [ ] Finalize heading sizes
   - [ ] Optimize line heights for readability
   - [ ] Add code block styling
   - [ ] Syntax highlighting theme

**Deliverable:** Professional, polished components library

---

### Phase 4: Content & Assets (Priority: Medium)

**Goal:** Populate site with real content

1. **Create initial blog posts**
   - [ ] Transfer markdown-style-guide.md
   - [ ] Write 2-3 technical blog posts
   - [ ] Add hero images for posts (1200x630px)
   - [ ] Add appropriate tags

2. **Create project pages**
   - [ ] Meshum case study (featured)
   - [ ] 2-3 additional projects
   - [ ] Add project images
   - [ ] Write compelling descriptions

3. **Add images**
   - [ ] Optimize wannes.jpg (if needed)
   - [ ] Create/add project screenshots
   - [ ] Create hero images for blog posts
   - [ ] Favicon (already exists: favicon.svg)

4. **Write about section**
   - [ ] Professional bio (2-3 paragraphs)
   - [ ] Company/product details
   - [ ] Contact information
   - [ ] Social links

**Deliverable:** Site populated with real, compelling content

---

### Phase 5: Performance & Optimization (Priority: High)

**Goal:** Achieve 95+ Lighthouse score

1. **Image optimization**
   - [ ] Use Astro `<Image>` component everywhere
   - [ ] Lazy load below-fold images
   - [ ] Preload hero images
   - [ ] Generate AVIF/WebP formats
   - [ ] Add proper width/height attributes

2. **Font optimization**
   - [ ] Add preconnect links to Google Fonts
   - [ ] Subset fonts if needed
   - [ ] Preload critical fonts
   - [ ] Verify font-display: swap

3. **Build optimization**
   - [ ] Enable compression in astro.config
   - [ ] Minify output
   - [ ] Check bundle sizes
   - [ ] Remove unused CSS

4. **SEO**
   - [ ] Verify all meta tags
   - [ ] Test Open Graph images
   - [ ] Validate sitemap
   - [ ] Test RSS feed
   - [ ] Add robots.txt
   - [ ] Add schema.org markup

**Deliverable:** 95+ Lighthouse score across all categories

---

### Phase 6: Testing & Launch (Priority: High)

**Goal:** Validate, test, and deploy

1. **Accessibility testing**
   - [ ] Run axe DevTools audit
   - [ ] Test keyboard navigation
   - [ ] Test with screen reader
   - [ ] Validate color contrast
   - [ ] Check heading hierarchy
   - [ ] Test motion preferences

2. **Cross-browser testing**
   - [ ] Chrome
   - [ ] Firefox
   - [ ] Safari
   - [ ] Edge
   - [ ] Mobile Safari
   - [ ] Mobile Chrome

3. **Responsive testing**
   - [ ] Mobile (320px - 767px)
   - [ ] Tablet (768px - 1023px)
   - [ ] Desktop (1024px+)
   - [ ] Large screens (1440px+)

4. **Performance validation**
   - [ ] Run Lighthouse audit
   - [ ] Check Core Web Vitals
   - [ ] Test on slow 3G
   - [ ] Validate image optimization
   - [ ] Check initial load size

5. **Final polish**
   - [ ] Spell check all content
   - [ ] Verify all links work
   - [ ] Test contact form (if added)
   - [ ] Verify analytics tracking
   - [ ] Test RSS feed in reader

6. **Deployment**
   - [ ] Choose hosting (Netlify, Vercel, Cloudflare Pages)
   - [ ] Configure domain
   - [ ] Set up SSL
   - [ ] Configure caching headers
   - [ ] Set up analytics
   - [ ] Submit sitemap to search engines

**Deliverable:** Live, production-ready website

---

## 📚 Reference Links

### Design Inspiration
- Meshum website: https://www.meshum.dev
- Clean, technical blogs for reference
- Modern portfolio sites

### Technical Documentation
- Astro Docs: https://docs.astro.build
- TailwindCSS v4: https://tailwindcss.com
- MDX: https://mdxjs.com
- OKLCH Color: https://oklch.com

### Tools
- Lighthouse: Built into Chrome DevTools
- axe DevTools: https://www.deque.com/axe/devtools/
- WAVE: https://wave.webaim.org
- Contrast Checker: https://webaim.org/resources/contrastchecker/

---

## 🎯 Success Metrics

### Primary Metrics
- **Blog traffic:** Measure via analytics
- **Lighthouse scores:** 95+ across all categories
- **Page load time:** < 2.5s LCP
- **Accessibility:** 100 score, WCAG AA compliant

### Qualitative Metrics
- **Design quality:** Professional, avoids "AI slop" perception
- **Content clarity:** Clear communication of expertise
- **User experience:** Easy navigation, clear CTAs
- **Technical demonstration:** Site itself showcases skills

---

## 🚀 Future Enhancements

**Post-launch features to consider:**

1. **Blog enhancements**
   - Tag-based filtering
   - Search functionality
   - Related posts algorithm
   - Newsletter signup
   - RSS feed subscriber count

2. **Interactive features**
   - Code playground embeds
   - Interactive demos
   - Comment system (e.g., Giscus)
   - Reactions/kudos

3. **Analytics & insights**
   - Popular posts widget
   - Reading progress bar
   - View counts (privacy-respecting)

4. **Content types**
   - Talks/presentations page
   - Uses page (tools, setup)
   - TIL (Today I Learned) section
   - Code snippets collection

5. **Technical improvements**
   - View transitions API
   - Offline support (PWA)
   - Dark mode toggle (manual)
   - Reading list/bookmarks

---

## 📝 Notes & Conventions

### Code Style
- Use Astro components (.astro) for UI
- TypeScript for utilities
- Tailwind utility classes for styling
- CSS variables for theme values
- No inline styles

### File Naming
- Components: PascalCase.astro
- Pages: lowercase-with-dashes.astro
- Utils: camelCase.ts
- Content: lowercase-with-dashes.md

### Git Workflow
- Commit messages: Conventional Commits format
- Branch naming: feature/*, fix/*, docs/*
- Small, focused commits

### Comments
- Document complex logic
- Explain "why" not "what"
- Add TODO comments for future work
- Use JSDoc for TypeScript functions

---

## ✅ Definition of Done

A feature/page is considered complete when:

1. **Functional**
   - [ ] Works as specified
   - [ ] No console errors
   - [ ] Data loads correctly
   - [ ] Links work

2. **Styled**
   - [ ] Matches design system
   - [ ] Responsive on all screens
   - [ ] Hover states implemented
   - [ ] Animations work (motion-safe)

3. **Accessible**
   - [ ] Keyboard navigable
   - [ ] Screen reader friendly
   - [ ] Sufficient color contrast
   - [ ] Semantic HTML

4. **Performant**
   - [ ] Images optimized
   - [ ] No layout shifts
   - [ ] Fast load time
   - [ ] No blocking resources

5. **Tested**
   - [ ] Cross-browser tested
   - [ ] Mobile tested
   - [ ] Accessibility tested
   - [ ] Lighthouse score validated

---

## 🤝 Contributing

This is a personal project, but if you're an AI agent helping with implementation:

1. **Follow the design system** - Use CSS variables, not hardcoded colors
2. **Respect the roadmap** - Implement phases in order
3. **Maintain accessibility** - Always follow WCAG guidelines
4. **Keep it performant** - CSS over JS, lazy load, optimize images
5. **Document changes** - Update this file if architecture changes
6. **Test thoroughly** - Validate changes across browsers/devices

---

## 📞 Contact

**Wannes Gennar**
Full-stack .NET Engineer
Founder, Elixus
Creator, Meshum

- Company: https://www.elixus.be
- Product: https://www.meshum.dev

---

**Last Updated:** 2025-01-21 (Updated with homepage implementation patterns)
**Version:** 1.1.0
**Status:** Homepage Complete - Continuing Implementation
