---
title: 'Hare'
description: 'An opinionated, simple and fast AMQP message bus library'
startDate: 2026-01-13
status: active
technologies: ['C#', '.NET 10', 'Native AOT', 'AMQP']
tags: ['Open Source', 'MIT License']
githubUrl: 'https://github.com/dealloc/hare'
liveUrl: 'https://www.nuget.org/packages/Hare'
sponsorUrl: 'https://github.com/sponsors/dealloc'
---

# Hare: An AMQP Messaging Library That Knows What It Is

Most .NET messaging libraries are trying to be everything to everyone. Full-featured service buses with support for every message broker, configuration option for days, abstractions on top of abstractions. That's great if you need all of that, but most of the time you just want to send and receive messages with AMQP brokers without fighting a framework.

That's what Hare is: a dead-simple, fast, and opinionated library for AMQP messaging in .NET. Built primarily for RabbitMQ but compatible with any AMQP 0.9.1 broker like LavinMQ.

## What It Actually Does

Hare focuses on one thing: type-safe message publishing and consuming with AMQP brokers using a queue-per-type pattern.

You define your message types as records, register them with a fluent builder API, and the library handles the rest. Publishers inject `IMessageSender<TMessage>` and send messages. Consumers implement `IMessageHandler<TMessage>` and process them. That's it.

The conventions get you up and running fast, but everything is overridable. You can set up complex routing topologies - you just need to respect the queue-per-type constraint. No learning a proprietary abstraction layer. Just AMQP with sensible defaults and maximum flexibility.

## Why It Exists

I kept running into the same pattern across projects: using AMQP brokers with `System.Text.Json` serialization, wanting queue-per-type routing, and needing something that works with Native AOT compilation. Existing libraries either brought in massive dependencies, weren't AOT compatible, or required so much configuration that simple tasks became complicated.

Hare exists because sometimes you don't need a service bus. You need a thin, fast wrapper around AMQP that gets out of your way but still gives you control when you need it.

## The Technical Decisions

**Conventional Routing**: By default, Hare derives queue names, exchange names, and routing keys from your message type names. An `OrderPlacedMessage` automatically routes to an `order-placed-message` queue. You can override any of this per-message, but the defaults handle 90% of use cases without configuration.

**Native AOT Compatible**: Everything is designed to work with .NET's Native AOT compilation. No runtime reflection, no dynamic code generation. Ships with `System.Text.Json` support out of the box using source generators, but serializers are pluggable if you need something else. This means instant cold starts and minimal memory footprint.

**Fluent Configuration**: The builder API is composable and discoverable. Global settings apply to all messages, per-message settings override them. The pattern should feel familiar if you've used modern .NET libraries.

**Strategic Flexibility**: The library uses contracts in strategic places to give you maximum control. Opinionated defaults get you started quickly, but you can override routing conventions, swap serializers, or configure complex topologies when needed. Messages publish to exchanges, so you're free to set up sophisticated routing - just keep each queue handling one message type.

**Built-in Dead-Letter Queues**: Failed messages get one retry, then route to a dead-letter queue automatically. The DLQ naming follows conventions (`{queue-name}.dlq`, `{exchange-name}.dlx`) but you can override it. No manual DLQ setup required.

**OpenTelemetry Integration**: Distributed tracing works out of the box. Correlation IDs propagate automatically. If you're using .NET Aspire, traces show up in the dashboard without additional configuration.

**Auto-Provisioning**: The library can automatically create exchanges, queues, and bindings when your application starts. No manual RabbitMQ setup for development environments.

## What It's Not

This is important: Hare has opinions and constraints.

It works with any AMQP 0.9.1 compatible broker (RabbitMQ, LavinMQ, etc.), but it's built with those semantics in mind. The library "leaks" some AMQP abstractions in places where it's more convenient than hiding them. Theoretically you could make it work with other messaging systems, but that's not officially supported.

The queue-per-type constraint is non-negotiable. You can set up complex routing topologies with multiple exchanges, topic routing, headers exchanges - whatever you want - but each queue must handle a single message type. If you need multiple message types per queue, this isn't the right tool.

It doesn't include saga orchestration, outbox patterns, or distributed transaction support. Those are real problems, but they're not what Hare solves.

The design philosophy is: opinionated defaults, strategic flexibility, minimal dependencies.

## The Real-World Impact

Hare is compact. The NuGet package is under 50KB. It only depends on RabbitMQ.Client and Microsoft.Extensions abstractions. That's it.

When compiled with Native AOT, applications using Hare start in milliseconds with minimal memory usage. This matters for serverless deployments, containerized applications, and anywhere cold start time or resource consumption is a concern.

The conventional routing means you spend less time writing configuration and more time shipping features. Define a message type, register it, done.

## Who Should Use This

If you're using an AMQP broker (RabbitMQ, LavinMQ, etc.), you want type safety without complexity, and you're okay with the queue-per-type constraint - Hare is worth trying. The opinionated defaults get you started fast, but you have full control when you need it.

## Current State

Hare is actively maintained and available on NuGet. The entire library is around 1,447 lines of code - small enough to understand in an afternoon, which is intentional. No magic, no surprises.

The examples use LavinMQ (a lightweight, high-performance AMQP broker), while the test suite runs against RabbitMQ. This proves the AMQP compatibility works in practice, not just in theory.

The API is intentionally minimal and focused. If you need something it doesn't provide, the code is straightforward enough to extend or you can use the underlying RabbitMQ.Client directly.

---

**Check it out**: [github.com/dealloc/hare](https://github.com/dealloc/hare)

**Install it**: `dotnet add package Hare` or explore it on [NuGet](https://www.nuget.org/packages/Hare)

MIT licensed and actively welcoming contributions if you want to help.
