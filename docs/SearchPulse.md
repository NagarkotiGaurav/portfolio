# Daily search pulse

Weekday report (target **9:07 AM IST**, weekends off unless requested). Answers three questions: what moved in search, which new queries are worth a page, and 2–3 actions.

**Honesty rule:** no invented clicks, impressions, CTR, positions, volumes, or difficulty. If Search Console (or a Queries + Pages CSV for the last 28 days) is missing, the pulse says so and stays qualitative.

## How to feed the next run

Paste either:

1. Search Console → Performance → **Queries** export (last 28 days), and
2. Search Console → Performance → **Pages** export (same date range)

Optional: a screenshot of the Performance overview. Do not paste PII.

Until an export exists, the pulse cannot report movement.

## Report template

```text
Date: YYYY-MM-DD (Asia/Calcutta)
Window: last 28 days (GSC) unless noted
Data: GSC export | missing

What moved
- [query or page] — [only if export supports it]

New queries worth a page
- [query] — why it matches a real offer; existing URL if any; do not invent volume

Actions (2–3)
1.
2.
3.
```

## 2026-09-19 (Saturday — weekend; shipping note)

**Data:** missing. No Queries or Pages CSV in this repo. No clicks, impressions, or rankings reported.

**What shipped in code (not yet a ranking claim):** `/hire-software-architect` — hire-intent landing. SERP observation (qualitative): hire queries are mostly solo “for hire” pages and marketplaces. This URL is the matching commercial page. It is not live until deploy + crawl.

**New queries worth a page (qualitative, no volumes):**

| Query group | Status |
| --- | --- |
| hire software architect / freelance software architect / software architect for hire | Landing written: `/hire-software-architect` |
| architecture review (time-boxed, written recs) | Offer exists in copy; dedicated URL not published — do not link it yet |
| startup MVP architect / scale an existing product | Separate ideas; do not invent pages until briefed |

**Actions**

1. Deploy the site (includes trailing-slash `html_handling` fix + the hire URL). Confirm `curl` title for `/hire-software-architect` is unique, not the homepage title.
2. Submit `https://gauravnagarkoti.tech/sitemap.xml` in Search Console and request indexing on `/hire-software-architect` after it returns 200 with the hire title.
3. Paste last-28-days Queries + Pages CSVs so Monday’s pulse can use numbers instead of this placeholder.

Monday 2026-09-21 ~9:07 IST is the next scheduled weekday pulse — still blocked on the export until you paste it.
