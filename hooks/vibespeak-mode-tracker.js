#!/usr/bin/env node
// vibespeak — UserPromptSubmit hook to track which vibespeak intensity is active.
// Inspects user input for /vibespeak commands and writes mode to a flag file.

const fs = require('fs');
const path = require('path');
const os = require('os');

const flagPath = path.join(os.homedir(), '.claude', '.vibespeak-active');

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
          try { fs.unlinkSync(flagPath); } catch (e) {}
          return;
        } else if (arg === 'short') mode = 'short';
        else if (arg === 'chatty') mode = 'chatty';
        else mode = 'normal';
      }

      if (mode) {
        fs.mkdirSync(path.dirname(flagPath), { recursive: true });
        fs.writeFileSync(flagPath, mode);
      }
    }

    // Detect natural-language activation phrases
    const activationPhrases = [
      'use vibespeak', 'plain english please', 'plain english',
      'eli5', 'no jargon', 'talk to me like im not a coder',
      'talk to me like i\'m not a coder'
    ];
    if (activationPhrases.some(p => prompt.includes(p))) {
      try {
        fs.mkdirSync(path.dirname(flagPath), { recursive: true });
        if (!fs.existsSync(flagPath)) fs.writeFileSync(flagPath, 'normal');
      } catch (e) {}
    }

    // Detect deactivation
    if (/\b(stop vibespeak|normal mode)\b/i.test(prompt)) {
      try { fs.unlinkSync(flagPath); } catch (e) {}
    }
  } catch (e) {
    // Silent fail
  }
});
