# Security Audit

Perform a security audit of the current change set or scoped files.

Respect project rules and architecture. Do not rewrite unrelated code.

## Scope
1. Identify the target (diff, paths, or module). If unclear, ask once.
2. Review for OWASP Top 10 and common app risks.

## Checklist
- Authentication / session security
- Authorization / broken access control
- Input validation
- SQL / NoSQL / command injection
- XSS / CSRF / SSRF
- Secrets & insecure storage
- File upload validation
- Rate limiting
- Race conditions / unsafe deserialization

## Output
For each finding:
- Severity: Critical | High | Medium | Low
- Impact
- Location (file + symbol/line if possible)
- Remediation
- Minimal code example of the fix

End with a prioritized remediation order. Do not invent vulnerabilities.
