# @vadistic/nexus-plugin-prisma

> My take on implementation of [nexus-plugin-prisma](https://github.com/graphql-nexus/nexus-plugin-prisma) for [@nexus/schema](https://github.com/graphql-nexus/schema)

## Why

The main difference is that codegen main source are @nexus/schema models (that are further enchanced by prisma types) - not the other way around (as in official plugin).

This allow:

- really low grained control
- input filter is exposed only if model field is exposed
- multiple models backed by same prisma type

## Status

Codegen is done - need runtime implementation

## How it looks

See [`./fixture`](./fixture)
