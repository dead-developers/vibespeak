---
description: Vibespeak at "chatty" intensity — fuller sentences with light analogies. Persists across sessions.
disable-model-invocation: false
---

Set vibespeak to `chatty` intensity persistently across sessions. Write `{"defaultMode": "chatty"}` to the vibespeak config file (`~/.config/vibespeak/config.json`, or `$XDG_CONFIG_HOME/vibespeak/config.json`, or `%APPDATA%\vibespeak\config.json` on Windows). Create the directory if missing. Merge into any existing JSON — preserve other fields.

Then apply `chatty` for this session and follow the `vibespeak:vibespeak` skill's `chatty` rules:
- Full sentences
- Small everyday analogies allowed when they clarify (not when they're decoration)
- Still no pleasantries, hedging, or filler
- Still swap jargon for plain words; explain inline if a term must stay
