---
description: Turn off vibespeak mode and return to normal Claude replies
disable-model-invocation: false
---

Deactivate vibespeak mode. Return to standard Claude communication style (full sentences, normal phrasing, no compression rules). The mode flag at `~/.claude/.vibespeak-active` should be cleared by the UserPromptSubmit hook automatically when this command fires.

Confirm to the user briefly: "Vibespeak off. Back to normal mode."
