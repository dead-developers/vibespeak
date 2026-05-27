---
description: Vibespeak at "short" intensity — text-message tight, fragments OK. Persists across sessions.
disable-model-invocation: false
---

Set vibespeak to `short` intensity persistently across sessions. Write `{"defaultMode": "short"}` to the vibespeak config file (`~/.config/vibespeak/config.json`, or `$XDG_CONFIG_HOME/vibespeak/config.json`, or `%APPDATA%\vibespeak\config.json` on Windows). Create the directory if missing. Merge into any existing JSON — preserve other fields.

Then apply `short` for this session and follow the `vibespeak:vibespeak` skill's `short` rules:
- Fragments OK
- Very tight phrasing, like a text message from a knowledgeable friend
- Still plain English, still no jargon
- Safety warnings and code remain exact and full
