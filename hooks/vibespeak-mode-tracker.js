#!/usr/bin/env node
// vibespeak — UserPromptSubmit hook.
//
// Two jobs every turn:
//   1. Track mode: inspect the user's prompt for /vibespeak commands and
//      natural-language activation/deactivation phrases, and update the flag
//      file accordingly.
//   2. Reinforce: if the mode is active after step 1, emit a tiny one-line
//      reminder of the ruleset to stdout. UserPromptSubmit stdout is added to
//      the model's context, so this re-states the rule each turn and keeps it
//      from decaying over a long session (the SessionStart inject happens only
//      once). The reminder is intentionally ~1 line to avoid token bloat.

const fs = require('fs');
const path = require('path');
const os = require('os');
const { safeWriteFlag, readFlag, reminderText } = require('./vibespeak-config');

const claudeDir = process.env.CLAUDE_CONFIG_DIR || path.join(os.homedir(), '.claude');
const flagPath = path.join(claudeDir, '.vibespeak-active');

function clearFlag() {
  try { fs.unlinkSync(flagPath); } catch (e) {}
}

let input = '';
process.stdin.on('data', chunk => { input += chunk; });
process.stdin.on('end', () => {
  try {
    const data = JSON.parse(input);
    const prompt = (data.prompt || '').trim().toLowerCase();

    // Match /vibespeak commands
    if (prompt.startsWith('/vibespeak')) {
      const parts = prompt.split(/\s+/);
      const cmd = parts[0]; // /vibespeak, /vibespeak:vibespeak, etc.
      const arg = parts[1] || '';

      let mode = null;

      if (cmd === '/vibespeak' || cmd === '/vibespeak:vibespeak') {
        if (arg === 'off' || arg === 'stop' || arg === 'normal') {
          // 'normal' here means "turn off the active flag for this session";
          // the persisted default is handled by the command/skill layer.
          if (arg === 'normal') {
            mode = 'normal';
          } else {
            clearFlag();
          }
        } else if (arg === 'short') mode = 'short';
        else if (arg === 'chatty') mode = 'chatty';
        else mode = 'normal';
      }

      if (mode) {
        safeWriteFlag(flagPath, mode);
      }
    }

    // Detect natural-language activation phrases
    const activationPhrases = [
      'use vibespeak', 'plain english please', 'plain english',
      'eli5', 'no jargon', 'talk to me like im not a coder',
      'talk to me like i\'m not a coder'
    ];
    if (activationPhrases.some(p => prompt.includes(p))) {
      if (readFlag(flagPath) === null) safeWriteFlag(flagPath, 'normal');
    }

    // Detect deactivation
    if (/\b(stop vibespeak|normal mode)\b/i.test(prompt)) {
      clearFlag();
    }

    // Per-turn reinforcement: re-state the rule while the mode is active.
    const active = readFlag(flagPath);
    if (active) {
      process.stdout.write(reminderText(active));
    }
  } catch (e) {
    // Silent fail — never block the user's prompt.
  }
});
