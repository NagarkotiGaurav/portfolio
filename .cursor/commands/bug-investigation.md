# Bug Investigation

You are investigating a bug. Prefer root cause over symptoms.

## Workflow
1. Reproduce (or confirm reproduction steps / error evidence).
2. Find root cause with evidence.
3. Explain root cause clearly.
4. Identify affected modules.
5. Implement the smallest safe fix (only if asked to fix, otherwise propose it).
6. Run available tests / lint / build.
7. Verify no obvious regressions.
8. Summarize: cause → fix → verification.

Do not refactor unrelated code. Do not rewrite working modules.
