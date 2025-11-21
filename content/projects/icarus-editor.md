---
title: 'Icarus Editor'
description: 'A simple editor for Icarus save files written in Flutter '
startDate: 2022-12-25
status: completed
technologies: ['Flutter', 'Dart']
githubUrl: 'https://github.com/dealloc/icarus_editor'
---

# When a Game's Grind Gets Too Real: Building Icarus Editor

Icarus is genuinely fun. Survive on a hostile alien planet, manage your resources, figure out the game's progression systems. It's got that addictive "one more run" feeling that keeps you playing at 2 AM when you should be sleeping.

Then you hit the grind wall.

At some point, the game stops being about discovery and starts being about doing the same tedious tasks over and over to farm materials. Durability systems mean you're constantly repairing gear. Quest requirements demand gathering thousands of identical items. The fun factor drops, and you're left wondering if you really want to spend three hours farming fiber just to have enough supplies for your next expedition.

Around 2022, the developers at RocketWerkz did something smart: they moved save files from cloud storage to local files. That single change opened up possibilities. And when those files turned out to be JSON, well, that's when things got interesting.

## The Obvious Solution

Once you realize your save file is just JSON sitting on your disk, the obvious thought hits: you could just edit the values directly. Need more wood? Find the wood count, change 50 to 5000. Gear durability getting you down? Set it to max. Problem solved, grind eliminated.

But editing JSON by hand is tedious and error-prone. Especially when you don't remember which property corresponds to which item, or you accidentally break the structure and corrupt your save.

So the next obvious thought: build a tool that does it properly.

## Flutter Made the Most Sense

The result is Icarus Editor, a small but genuinely useful utility that loads your save files and gives you a clean interface to edit them. Want to adjust item quantities? There's a field for that. Durability giving you grief? Set it back to 100. The interface is straightforward: load your save, make changes, save it back.

The tricky part was getting the actual item data. You could hardcode a list of items, sure, but that breaks every time the game updates. Every new item added to the game becomes an unknown property you can't edit.

The clever approach: extract the available items directly from the game's asset files. No hardcoded lists, no maintenance burden when updates ship. The editor always knows what items exist in your current version of the game.

## Unreal Engine Makes This Easy

Icarus runs on Unreal Engine, and that's actually great news from a modding perspective. The Unreal asset format is pretty well-documented and understood by the community. Tools exist to unpack and read these files, so automating the extraction wasn't some heroic reverse-engineering effort.

Point the extraction code at your game installation, let it parse the Unreal asset files, and out comes a list of every item in the game with all its properties. The editor then uses that data to populate its interface dynamically.

This is the kind of automation that makes the difference between a tool that works and a tool that requires maintenance every patch. Change the game, the editor adapts. No code changes necessary.

## Scratching Your Own Itch

There's something satisfying about building a tool specifically because you're tired of a problem in software you use regularly. The motivation is clear. You know exactly what the pain point is because you've felt it. And you know when your tool actually solves it because you've tested it on the problem yourself.

That's the Icarus Editor in a nutshell. Someone was grinding, got frustrated, realized the game files were editable, and built exactly the tool they needed. Nothing overcomplicated, nothing solving problems that don't exist. Just a Flutter app that does one thing and does it well.

## Why This Matters Beyond Just One Game

Tools like this exist in a weird space. Technically, you could argue that editing save files violates some terms of service somewhere. But in practice, single-player games with local saves have always been a gray area. You own the save file on your computer. Modifying your own data to skip the parts you find tedious? That's between you and your conscience.

More importantly, it's a reminder that game developers who support local saves and open file formats are enabling community creativity. RocketWerkz made that change not expecting save editors, but that decision created the possibility. And that's how you foster community tools and passion projects.

## What's Next

The project is MIT licensed and open to contributions if you want to help expand it or maintain it as the game updates. The codebase is straightforward enough that adding new features or adapting to game changes isn't a huge lift.

Whether you're trying to skip the grind, experimenting with different playstyles, or just tweaking your save because you want to, the tool exists. It's a nice example of the kind of thing communities can build when games are designed with transparency in mind.

---

**Try it out**: [github.com/dealloc/icarus_editor](https://github.com/dealloc/icarus_editor)

MIT licensed and actively welcoming contributions. If you've got ideas or find bugs, the project's open to help.

**Note**: This is for single-player saves only. Use responsibly, and remember: this is for your own game installation, not multiplayer progression.
