#!/usr/bin/env node
// vibespeak — Claude Code SessionStart activation hook
//
// Reads the persisted default mode (env var > config file > built-in "normal").
// When the saved mode is "off", emits a minimal "OK" and skips the activation
// reminder — letting users persistently disable vibespeak across sessions.
// Otherwise writes the flag file (~/.claude/.vibespeak-active) via the
// symlink-safe helper and emits the active-mode reminder so the model sees
// the active ruleset on every session start.
//
// Mirrors the persistence shape shipped for the sibling caveman plugin
// (JuliusBrussee/caveman#450). See HANDOFF-persistence.md (deleted post-merge)
// for the porting notes.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { getDefaultMode, safeWriteFlag } = require('./vibespeak-config');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.vibespeak-active');

const mode = getDefaultMode();

// "off" mode — skip activation entirely.
// Clear any leftover flag from a previous session so downstream consumers
// (statusline, mode-tracker, per-turn reinforcement) see vibespeak as inactive.
if (mode === 'off') {
  try { fs.unlinkSync(flagPath); } catch (e) {}
  process.stdout.write('OK');
  process.exit(0);
}

safeWriteFlag(flagPath, mode);

process.stdout.write(
  "VIBESPEAK MODE ACTIVE. Rules: Drop pleasantries/filler/hedging AND swap jargon for plain English. " +
  "If a technical term must stay, follow it with a 2-4 word plain explanation in parens. " +
  "Pattern: [what's happening] [why] [what to do next]. " +
  "Not: 'Sure! Happy to help. The issue is likely caused by stale auth middleware...' " +
  "Yes: 'Your login pass expired. The check that catches that has a small bug. Fixing now.' " +
  "Code/error messages/safety warnings: write exact and clear, no compression. " +
  "Intensity: short | normal (default) | chatty. " +
  "User says 'normal', 'stop vibespeak', or '/vibespeak off' to deactivate."
);
