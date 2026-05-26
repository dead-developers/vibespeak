# vibespeak

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/dead-developers/vibespeak?style=social)](https://github.com/dead-developers/vibespeak/stargazers)
[![GitHub last commit](https://img.shields.io/github/last-commit/dead-developers/vibespeak)](https://github.com/dead-developers/vibespeak/commits/main)
[![Token savings](https://img.shields.io/badge/token_savings-61%25-brightgreen)](#how-much-does-it-save)
[![For Claude Code](https://img.shields.io/badge/for-Claude_Code-D97757?logo=anthropic&logoColor=white)](https://claude.com/claude-code)
[![Plain English](https://img.shields.io/badge/jargon-free-blue)](#what-it-does)

A Claude Code skill that makes replies shorter **and** easier to understand.

Think of it as a friendlier cousin of [caveman mode](https://github.com/JuliusBrussee/caveman): same idea (cut the filler, save tokens) but **also** swaps technical jargon for everyday words so you can actually follow along without a CS degree.

## What it does

When vibespeak is on, Claude will:

- Drop pleasantries (no "Sure! Happy to help...")
- Drop hedging and filler words
- Swap jargon for plain English ("middleware" → "the code that runs between the request and your app")
- Explain technical terms inline when they have to be used
- Keep code, error messages, and safety warnings exact and clear

## How much does it save?

Measured across 4 real test prompts (explaining middleware, debugging a TypeError, comparing two databases, reviewing a risky SQL command):

| Mode | Tokens used | Savings |
|---|---|---|
| Normal Claude | 2,688 | — |
| caveman | 899 | −67% |
| **vibespeak** | **1,048** | **−61%** |

vibespeak gives up about 6 percentage points of compression compared to caveman in exchange for actually explaining the words it uses. If you're a working programmer who knows every term cold, caveman is the better deal. If you're a beginner, hobbyist, vibe-coder, or just someone who finds technical terminology hard to follow, vibespeak is built for you.

## Install

### Option 1: Plugin marketplace (recommended)

```
/plugin marketplace add dead-developers/vibespeak
/plugin install vibespeak@vibespeak
```

### Option 2: Drop in the .skill file

Download [`vibespeak.skill`](./vibespeak.skill) and double-click it, or copy [`skills/vibespeak/SKILL.md`](./skills/vibespeak/SKILL.md) into your Claude skills folder.

## How to use it

Turn it on with any of these:

- `/vibespeak`
- "use vibespeak"
- "plain english please"
- "talk to me like im not a coder"
- "ELI5"
- "no jargon"

It also auto-turns-on when you seem stuck on a technical term (e.g. asking "wait what does that mean").

**Intensity levels:**

- `/vibespeak short` — text-message tight
- `/vibespeak normal` — default, like a clear coworker
- `/vibespeak chatty` — slightly more context and small analogies

**Turn it off:**

- `/vibespeak off`
- "stop vibespeak"
- "normal mode"

Once on, vibespeak stays on for every reply until you turn it off — like caveman mode.

## When vibespeak steps out of compressed mode

For safety-critical stuff, vibespeak deliberately writes a full, careful warning instead of staying terse:

- Before deleting data
- Before destructive git operations
- Before sending money or running risky shell commands
- When you seem genuinely confused (it slows down and explains in full)

Code blocks, error messages, file paths, and commit messages are also always written exactly — never paraphrased.

## Built with

[skill-creator](https://github.com/anthropics/skills), which provides the tools for spawning test agents, grading outputs, and benchmarking skill iterations.

## License

[MIT](./LICENSE)
