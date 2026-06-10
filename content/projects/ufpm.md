---
title: 'ufpm'
description: 'An unofficial CLI package manager for FoundryVTT, written in Rust. Fast, transparent, parallelized where possible, transactional where it matters, and resilient against failures.'
startDate: 2026-05-15
status: active
technologies: ['Rust']
githubUrl: 'https://github.com/dealloc/ufpm'
---

# ufpm: A Package Manager for FoundryVTT That Actually Behaves

[FoundryVTT](https://foundryvtt.com) is a self-hosted virtual tabletop platform for running tabletop RPGs. It has a built-in package manager, and it has... issues.

The existing package manager downloads the *entire* package index in one giant API call — no pagination, no streaming, just a raw `5.5 MB` JSON blob that can take anywhere from 5 to 20 seconds depending on your connection. You can't preview what has updates before updating. If an update fails halfway through, it doesn't report what succeeded and doesn't offer a rollback. And there is no way to tell whether a module is actually enabled in any of your worlds, so cleaning up your install is a guessing game.

`ufpm` is the alternative: a CLI package manager built in Rust that behaves like `uv` or `cargo`. Fast, transparent, parallelized where possible, transactional where it matters, and resilient against failures.

## What It Does

- **Parallel installs**: packages download and extract concurrently — no waiting for one to finish before the next starts
- **Transactional updates**: each package is backed up before being replaced; crashes mid-swap are detected and recovered on the next run
- **Resumable downloads**: interrupted downloads resume from where they left off, even for protected packages with time-limited signed URLs
- **Dependency resolution**: module-to-module dependencies are resolved from manifests automatically
- **World-aware**: scans LevelDB world settings to determine which modules are actually in use, so you can clean your install with confidence
- **Sane version parsing**: handles the full range of version strings in the wild — `"1..1"`, `"V1.0.1"`, `"2.0-beta.3"`, `"3+"`, `"25.A.2.1"` and worse

## The Background

The FoundryVTT API is completely undocumented, so building this required piecing together the API shape from various sources — request bodies, auth flow, ownership semantics, the works. The 4,475-package index was sifted for edge cases, revealing that roughly 3% of version strings in the wild are garbage. Module dependencies live in individual package manifests rather than the index. LevelDB world settings modify the database when read, so scanning requires working from a temp copy.

All of that research lives in `ufpm`'s implementation.

## The Development Story

`ufpm` was the subject of an experiment: I handed a detailed spec (weeks of research condensed into a prompt) to Fable 5 and asked it to implement all eight phases, committing at the end of each with a fully green CI run. By morning it had written approximately 20,000 lines of Rust across 9 commits, 67 tests, and verified the tool against a live FoundryVTT installation.

The Fable-built version was the starting gun. The version in this repo is mine — informed by what Fable produced, built the way I'd have built it from the start.

Read the full story: [Putting Fable 5 to work: a full Rust CLI in one night](/blogs/anthropics-new-fable)

---

**Check it out**: [github.com/dealloc/ufpm](https://github.com/dealloc/ufpm)
