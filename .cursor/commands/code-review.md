# Code Review

Review the current diff or named files like a Staff Engineer.

Respect project rules. Review only what changed unless asked for wider context.

## Check
- Architecture fit
- SOLID / DRY / KISS / YAGNI
- Correctness & edge cases
- Performance
- Security
- Readability & naming
- Scalability / concurrency / memory (when relevant)
- Tests adequacy

## Output
Group findings as:
- Critical
- High
- Medium
- Low
- Suggestions

For each finding: location, problem, why it matters, concrete fix.
End with verdict: Approve | Approve with nits | Request changes.
