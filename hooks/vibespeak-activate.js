#!/usr/bin/env node
// vibespeak — Claude Code SessionStart activation hook
//
// Mirrors the caveman hook pattern:
//   - Writes a flag file at ~/.claude/.vibespeak-active so a statusline
//     script (or other tooling) can confirm vibespeak mode is loaded.
//   - Emits a short ruleset reminder as SessionStart context so the
//     active model sees the mode in its system reminders.
//
// Pure addition — if you don't wire it up, nothing changes.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.vibespeak-active');

try {
  fs.mkdirSync(path.dirname(flagPath), { recursive: true });
  fs.writeFileSync(flagPath, 'normal');
} catch (e) {
  // Silent fail — flag is best-effort, don't block the hook
}

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
