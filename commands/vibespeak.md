---
description: Turn on vibespeak mode (plain English, jargon-free, compressed replies)
disable-model-invocation: false
---

Activate vibespeak mode for this and all following responses in this session. Read the vibespeak skill at the `vibespeak:vibespeak` path and follow it.

Rules in short:
- Drop pleasantries, filler, hedging
- Swap technical jargon for everyday words; if a term has to stay, follow it with a 2-4 word plain explanation in parens
- Pattern: [what's happening] [why] [what to do next]
- Code, error messages, and safety warnings: write exact and clear, no compression
- Stays on until user says "stop vibespeak", "/vibespeak off", or "normal mode"

If an intensity argument is given (`short`, `normal`, `chatty`), use that. Otherwise default to `normal`.

Argument: $ARGUMENTS
