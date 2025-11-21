---
title: 'Helldivers 2 Community API'
description: 'A community-driven REST API for Helldivers 2, providing real-time game data including war status, planetary campaigns, and player statistics in JSON format.'
startDate: 2024-02-27
status: active
technologies: ['C#', '.NET 10', 'Native AOT', 'Source Generators', 'REST API', 'OpenAPI', 'Docker', 'Alpine Linux']
githubUrl: 'https://github.com/helldivers-2/api'
liveUrl: 'https://api.helldivers2.dev'
---

# Building a Community API for Helldivers 2: Learning to Thrive Under Extreme Constraints

When Helldivers 2 came out it's vibrant community wanted a way to track the status of the Galactic war on the go.
A lot of talented developers started developing websites, Discord bots, apps and even live wallpapers that tracked the
current status of the galactic wary.

The problem was that (especially in the beginning) Arrowhead studios' servers were seriously struggling to keep up with
players, let alone hundreds of developers hammering the servers with their own pet projects. I decided to create an API
that would sit in front of ArrowHead's game servers and provide a nicer format for developers to work with (their API is
designed for games to access, so it's not exactly following REST best practices let's say).

Today we're breaking down how the [Helldivers 2 Community API](https://github.com/helldivers-2/api) actually works,
why its architectural decisions make sense, and what it took to run a fully-featured API on just 256MB of RAM.

## What Does It Even Do?

The API gives developers access to all the juicy Helldivers 2 data you'd want:

Real-time war status, planetary campaign details, player statistics, current missions, weapon specs, stratagem info.
Everything gets transformed into clean JSON that's actually pleasant to work with. No authentication required,
though there's a reasonable rate limit to keep things fair for ArrowHead's infrastructure.

It's not affiliated with ArrowHead officially, but the community has already built some genuinely cool stuff on top of it:
Discord bots for coordinating operations, historical dashboards tracking campaign data, TypeScript wrappers for easier integration.

## The Technical Foundation

Here's where things get interesting. The whole thing is written in C# and .NET 10, and we made a really deliberate choice:
built it to compile with Native AOT (Ahead-of-Time compilation).
That might sound like implementation detail, but it's actually the heart of how this thing runs so efficiently.

Instead of shipping a .NET runtime with the API, Native AOT produces a standalone binary with zero runtime dependencies.
You get instant cold starts, sub-second startup times, and a binary that's lean enough to run comfortably on Alpine Linux.

Why does this matter? Because we're running this thing on 256MB of RAM while handling over 10,000 requests.
Try doing that with a traditional .NET, Java or Javascript setup.

(if you're wondering why the 256MB, that's what our hosting provider let's us get away with for free)

## Optimizing for the Impossible

Getting a full-featured API to run in 256MB isn't a joke. It required some creative thinking:

**Static Data Compilation**: Game data like planets, biomes, factions gets compiled into the binary itself using custom
Roslyn source generators. No runtime parsing, no allocations for lookups. The compiler does all the heavy lifting,
and the binary just reads from pre-built dictionaries.

**JSON Without Allocations**: Using `System.Text.Json`'s source generators means serialization happens at compile-time, not runtime.
Your responses go out with minimal memory pressure.

**Slim Builder Pattern**: Instead of loading every ASP.NET Core feature, we use `WebApplication.CreateSlimBuilder()`
to strip out unnecessary stuff. Why pay for features you don't need?

**Smart Caching**: Rate limiting needs to track request counts, but a naive implementation would eat memory fast.
We built efficient caching with aggressive eviction policies.

**Response Compression**: Brotli and Gzip compression reduces both bandwidth and the memory needed for response buffering.

All of these choices add complexity to the codebase, but the tradeoff is absolutely worth it. An API this responsive and
efficient on these constraints is genuinely rare (even if I do say so myself!).

## Documentation That Doesn't Tank Production

Here's a clever bit of engineering: OpenAPI documentation only gets generated during debug builds.
This means Swagger dependencies never make it into production, keeping the binary lean.

The multi-stage Docker build conditionally runs the documentation generation and embeds the spec in static files.
Developers get comprehensive API docs, but production stays clean.

It's not perfect though. .NET 10 brought a lot of changes on how OpenAPI is integrated, so we'll have to review that in
the future and see if we need to update our current approach.

## The Rate Limiting Reality

They had to think carefully about rate limits. Too strict and the community API becomes useless.
Too loose and they're hammering our backend (too much outgoing bandwidth and we end up paying extra).
The current setup gives the community fair access while preventing abuse.

Rate limit headers (`X-Ratelimit-Limit`, `X-RateLimit-Remaining`, `Retry-After`) help clients implement proper retry logic
instead of just hammering the endpoint blindly.
We're following best practices for rate limiting, even Github does things this way!

## What Actually Went Hard

**Native AOT Compatibility**: Eliminating all runtime reflection is tedious. No dynamic code, no runtime serialization tricks,
everything needs to be knowable at compile-time. It forces cleaner architecture, but it's definitely not the path of least resistance.

**Memory Profiling**: Running on 256MB means every allocation hotspot matters. This wasn't "lean" optimizations,
this was finding where memory was leaking and fixing it. Some of the source generator work exists purely because removing
those allocations from runtime made a measurable difference.

**Docker Build Complexity**: Getting a multi-stage build to conditionally include generation tools while keeping production
minimal requires careful orchestration.

**Community Infrastructure Sustainability**: Building something useful that people actually depend on is the easy part.
Keeping it running reliably, communicating about changes, preventing abuse. That's the ongoing work.

## What the Community Built

Over 250 GitHub stars in, and people have actually used this thing:

- Galactic Wide Web, a Discord bot for coordinating operations
- Helldivers History, showing campaign trends and historical data through git scraping
- Various dashboards and analysis tools
- Community-maintained TypeScript client

It's not a huge ecosystem, but it's proof that this infrastructure actually matters to people.

## The Real Lesson Here

The constraints forced really good architectural decisions. Native AOT and source generators started as solutions to the
memory problem, but they delivered benefits in startup time, throughput, and deployment size that a traditional setup wouldn't match.

Modern .NET is genuinely capable of competing with lower-level languages on efficiency while still being pleasant to write
and maintain. This project is good evidence of that.

And honestly, the most interesting part might be the human side. A community saw something missing, built it,
documented it well, and now developers have infrastructure that improves the game experience.
No official studio backing. Just people who cared enough to do the work.

That's the kind of infrastructure open source communities should be building more of.

---

**Check it out**: [github.com/helldivers-2/api](https://github.com/helldivers-2/api)

**Want to explore the API?** Head to [helldivers-2.github.io/api](https://helldivers-2.github.io/api/openapi/swagger-ui.html) for interactive docs.

MIT licensed and actively welcoming contributions if you want to help.
