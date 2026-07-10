---
title: 'Meshum'
description: 'A control plane that gives organizations one place to see, manage, and govern how their people use AI — across Claude Code, Codex, OpenCode, and beyond.'
startDate: 2026-07-10
status: active
technologies: ['Rust', 'Elixir', 'Phoenix', 'PostgreSQL']
githubUrl: 'https://github.com/meshum/meshum'
liveUrl: 'https://www.meshum.dev'
sponsorUrl: 'https://github.com/sponsors/dealloc'
---

# Meshum: Governance for the AI Tools Your Company Just Rolled Out

If you've helped a company roll out Claude Code, Codex, or any other AI coding tool to a team, you've hit the same wall every time. A week in, someone asks the obvious questions: What are people actually doing with this? Are any of these MCP servers reading files they shouldn't? How do we get everyone using the same skills and agent configs instead of forty slightly different homemade setups? And is there any credential leaking out through some tool nobody vetted?

Nobody has good answers, because nobody built the tooling to answer them. Every company ends up hacking together its own partial solution — a script here, a wiki page there, a Slack channel where people are supposed to ask before installing an MCP server. It never really works.

That's the gap Meshum is built to close.

## Where This Came From

This pitch didn't come from a whiteboard — it came from doing this work directly. Consulting at companies rolling out AI tooling to developers (and soon after, to non-developer staff) surfaced the same set of questions over and over: How do employees use these tools effectively? What are the security concerns? How do employees share skills with each other? How do we get visibility into what's actually happening? How do we stop a tool from reading a credentials file it has no business touching?

Watching multiple companies independently build ad-hoc, half-finished answers to the exact same problem was the signal that this needed to exist as a real product, not another internal script.

## What Meshum Actually Does

Meshum is a centralized platform for **seeing**, **managing**, and **governing** how an organization uses AI — not tied to one vendor, and not a replacement for the AI itself.

- **See** — aggregate AI usage telemetry across the org (most clients, like Claude Code, already emit OpenTelemetry) and turn it into actual insight instead of forty people's untracked local sessions.
- **Manage** — distribute skills, agents, MCP tooling, and AI client configuration to every employee machine from one control plane, instead of everyone hand-rolling their own setup.
- **Govern** — decide which MCP servers are reachable at all, down to filtering individual tools inside a server, so nobody's agent quietly gets access to something nobody approved.

Two things it deliberately does **not** do. It doesn't run or proxy the AI model itself — no model hosting, no sitting between you and Anthropic or OpenAI's inference. It manages configuration and policy, not the platform. And it isn't positioned as a blocker: a determined developer can work around almost any block, so Meshum doesn't pretend to be airtight enforcement. It's governance tooling that gives management visibility and control while staying out of employees' way — the goal is that people are glad it exists, not that they're fighting it.

## The Actual Architecture

Three components, not one monolith:

- A **daemon** (Rust) that runs on each employee's machine, syncing skills, agents, configs, and settings down from the control plane. It has a tray icon and stays out of the way. It doesn't enforce or block anything locally — it's sync, not a cop.
- A **gateway** (Elixir/Phoenix) that acts as an MCP proxy. AI agents call it exactly as they'd call the MCP server they actually need — Jira, GitHub, whatever — and it's a single aggregated MCP endpoint under the hood: one connection, one OAuth handshake, with every upstream's tools merged in and namespaced (`jira.get_issue`, `github.get_issue`) so nothing collides and nothing needs reconfiguring when a new upstream gets added. It filters out whatever policy doesn't allow, and exchanges each caller's identity for a per-user upstream credential rather than a shared service token, so the underlying tool's own authorization and audit trail still work correctly.
- A **web control plane** (Elixir/Phoenix LiveView) where the organization actually sees usage, and authors and deploys the policies that flow out to the gateway and the daemon.

The whole thing is self-hosted by design. It holds upstream credentials and collects usage telemetry — both are sensitive enough that single-tenant, on-your-infrastructure deployment is the safer default, not an afterthought. A hosted offering exists for smaller companies without the infrastructure or dedicated devops to run it themselves.

## Why Now

Companies are rolling out AI coding tools to entire engineering orgs (and beyond) faster than they're building any way to govern that rollout. The gap between "everyone has Claude Code" and "we have any idea what that means for security or effectiveness" is real, and it's the same gap at every company doing this. That repetition — the same unanswered questions, company after company — is the signal that this is worth building as a product rather than a one-off internal tool each time.

## The Current State

This is early — version `0.0.1`, interfaces still unstable. The first MVP target is Claude Code specifically, with other vendors (Codex, OpenCode, and beyond) following once the core is proven — the architecture is deliberately generic enough not to be overfit to one vendor's platform.

v1 scope is intentionally narrow: telemetry ingestion, MCP server/tool allow-and-block policy through the gateway, and skill/agent distribution with the control plane as source of truth and the daemon re-syncing on drift. Things like audit logs, approval flows, and per-user overrides are explicitly out of scope for now — the goal for this stage is a usable product worth demoing to the companies whose struggles inspired it, not a feature-complete platform.

## Who This Is For

IT, security, and engineering leadership at companies that have already rolled out AI tooling — or are about to — and have no answer for what happens after rollout. If you've ever had to explain to leadership what your developers' AI agents can actually access, or watched three different teams build three different internal scripts to solve the same governance problem, this is for you.

---

**Check it out**: [www.meshum.dev](https://www.meshum.dev)

Early stage, but if you're interested in joining the waitlist or want to talk about what you're struggling with: they're listening.

The GitHub org: [github.com/meshum](https://github.com/meshum)
