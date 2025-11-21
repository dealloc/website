---
title: 'DungeonRS'
description: 'A cross-platform TTRPG map editor built with Rust and Bevy, featuring a modular architecture and modern UI.'
startDate: 2024-04-26
status: active
technologies: ['Rust', 'Bevy 0.17', 'egui', 'Fluent', 'ECS', 'Cross-platform']
githubUrl: 'https://github.com/dungeon-rs/dungeon-rs'
---

# DungeonRS: Building a Map Editor and Actually Maintaining It

So I started this project because, yeah, the Pathfinder 2e dungeon sketching problem. Every DM knows the moment: players go off-script, you've got thirty seconds to draw something on paper that doesn't look like garbage, and everyone's waiting.

DungeonDraft exists and it's good. But I wanted to see what you could actually build if you started with the right foundation instead of bolting things together. Rust, Bevy, modern tooling. Do it properly from day one.

That was... a lot of work.

## Why Bevy Actually Makes Sense Here

This is the part that throws people. "You used a game engine for a map editor?"

Yeah, and it's not dumb. Map editors need to render a bunch of stuff, handle camera controls, manage assets, process input. That's literally what Bevy is built for. You get hardware-accelerated rendering through wgpu, an entity-component-system for organizing data, asset loading with hot-reloading during development. All the boring infrastructure you'd have to build yourself with a traditional UI framework.

The alternative is picking something like Qt or GTK, then writing your own tile rendering engine, your own camera system, your own asset management. That's just reinventing what Bevy already does.

## The 11-Crate Thing

Early on I decided to split this into a Cargo workspace with separate crates. Not because it looked good on a résumé, but because I knew I'd hate debugging a monolithic mess.

The core data structures live in their own crate with zero dependencies. That means the serialization system can load/save maps without knowing anything about Bevy or the UI. Theoretically you could build a headless tool that generates maps. Or a CLI. Whatever.

The UI is its own crate using egui because Bevy's built-in UI was still getting figured out when I started. Everything else—assets, configuration, localization, CLI tools—is separated the same way.

This sounds like overkill until you're trying to fix a bug and you can actually compile and test a single crate in two seconds instead of waiting for the whole app to rebuild. Or when you want to refactor something and it's immediately obvious what breaks because the dependencies are explicit.

## The Parts That Actually Exist

The foundation works. You can create projects, the UI renders without crashing, assets load properly. Camera controls work, rendering works, the ECS architecture is doing what it's supposed to.

I got this far by having the discipline to properly separate concerns before adding features. That sounds boring. It is boring. But boring means things don't collapse when you change something.

What's actually still missing is, you know, the map editor part. Tile placement, layer management, the drawing tools. All the stuff that makes it an editor and not just a project manager.

## The Technical Choices That Mattered

I'm using Rust 1.88+ with the 2024 edition. No unsafe code anywhere. Every function has to be documented, even the private ones. Yeah, that's strict, but it forces you to think about what you're writing.

The compilation profiles are tuned specifically for this. Development builds use dynamic linking, which cuts rebuild time massively. There's a separate profile for CI builds that trades optimization for speed. The release build enables everything: LTO, single codegen unit, the works.

And the tooling around it—`just` for tasks, `cliff` for changelog generation, `cargo-deny` for auditing dependencies—that's not cargo cult stuff. That's just what production software looks like.

The ECS architecture is probably the most controversial choice. Map elements are entities, properties are components, editor features are systems. It's weird if you're used to traditional OOP, but it makes undo/redo, copy/paste, and layer manipulation way cleaner than any OOP hierarchy would be.

## The Honest Assessment

It's early. You can't use this to actually make maps yet. But 640+ commits in, the architecture hasn't become a disaster, the codebase is staying maintainable, and there's a clear path to features without rearchitecting everything.

The last commit was five days ago. That's the reality: side projects happen in bursts. Some weeks you're heads-down working through problems. Other weeks you don't touch it for a month. That's fine. The code is there, it's solid, and when I come back to it the foundation doesn't fight me.

## Rust + Bevy as a Tool

There's something that happened recently where Rust became actually practical for building desktop tools. The ecosystem stabilized. Bevy stopped breaking everything with every release. Cross-platform support just works.

You're not using Electron, which means you're not shipping a 150MB bundle with a whole browser engine. You're not using Qt, which means you're not fighting outdated UI frameworks. You're not using C++, which means you're not drowning in build system pain.

Rust + Bevy compiles to a fast native binary. The type system catches bugs before they exist. Compile times are reasonable with the right setup. It actually hits a good balance.

## Should You Use This?

Not yet. If you need a map editor now, use DungeonDraft. It works.

But if you're curious about how you'd structure something like this with modern Rust? If you want to see what proper workspace architecture looks like? If you're wondering whether you could actually build real tools with Bevy instead of game engines? The code is there.

The foundation is solid. The patterns are there. Someone could fork this and finish it if they wanted. That someone might even be future me when I have the motivation to actually build the UI part.

---

**Check it out**: [github.com/dungeon-rs/dungeon-rs](https://github.com/dungeon-rs/dungeon-rs)

Early stage, actively maintained when I'm working on it. The infrastructure is done. The features are still coming.
