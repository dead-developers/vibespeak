---
description: Turn off vibespeak mode persistently — survives session restarts
disable-model-invocation: false
---

Turn off vibespeak persistently across sessions. Write `{"defaultMode": "off"}` to the vibespeak config file (`~/.config/vibespeak/config.json`, or `$XDG_CONFIG_HOME/vibespeak/config.json`, or `%APPDATA%\vibespeak\config.json` on Windows). Create the directory if missing. Merge into any existing JSON — preserve other fields.

After writing, return to standard Claude communication style for the rest of this session AND every future session. The SessionStart hook reads `defaultMode` and skips activation when it's `"off"`.

To re-enable: `/vibespeak normal` (or any non-off level), or delete the config file.
