# 04 — Prompts & Process Log (the graded artifact)

Append every meaningful prompt + what it produced, live, as the build runs. This is
what the CTO grades. Keep it clean — no previous-employer IP.

Format per entry:

```
### [Phase N] <short title> — <timestamp>
- Tool: Claude Code / Codex / Sonnet / Opus
- Goal: <one line>
- Prompt: <the exact prompt>
- Output: <what it produced — files, result>
- Gate: <typecheck/lint/unit/E2E result>
- Decision/learning: <why, trade-off>
```

---

### [Phase 0] Repo study + scope — 2026-11-04
- Tool: Claude Code (Opus)
- Goal: Understand the source and decide scope before any code.
- Output: Cloned `source-nuxt/`; counted 613 components / 82 pages / 881 tests;
  found OpenAPI schema; decided vertical-slice scope (see `02-scope-and-approach.md`).
- Decision: Full 1:1 port is infeasible and not what's graded → port core commerce
  flow with full pipeline + reports; mock data from OpenAPI schema.

<!-- next entries appended during the build -->
