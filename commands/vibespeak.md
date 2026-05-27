---
description: Switch vibespeak intensity level (short/normal/chatty/off) — persists across sessions
disable-model-invocation: false
---

Requested level: $ARGUMENTS.

Resolve the level:
- Empty → "normal" (the documented default)
- Aliases: "stop", "disable", "persist-off" → "off"; "on", "enable" → "normal"
- Valid levels: off, short, normal, chatty. Anything else: tell the user the valid set and stop.

Write the resolved level to the vibespeak config file so the choice persists across sessions:
- macOS/Linux: `~/.config/vibespeak/config.json` (or `$XDG_CONFIG_HOME/vibespeak/config.json` if set)
- Windows: `%APPDATA%\vibespeak\config.json`

Create the parent directory if missing. Read any existing JSON; merge `{"defaultMode": "<level>"}` into it (do not clobber other fields). Write the result back.

Then act on the new level for this session:
- If level is "off": return to normal Claude voice for the rest of this session and every future session — the SessionStart hook reads `defaultMode` and skips activation.
- Otherwise: drop pleasantries/filler/hedging, swap jargon for plain English. Intensity per skills/vibespeak/SKILL.md.

Persistence is symmetric: `/vibespeak off` persistently disables, `/vibespeak <level>` persistently sets that level. To clear the persistent choice entirely, delete the config file.
