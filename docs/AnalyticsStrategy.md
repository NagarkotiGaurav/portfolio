# Analytics Strategy

The site is a React SPA. GA4 must receive **explicit route changes**. GTM container **GTM-T45H6MZF** is the only GA4 loader. Do not also set `VITE_GA_MEASUREMENT_ID`.

```text
React interaction
      │
      ▼
track()
      │
      ├── dataLayer.push({
      │     event: "cta_strategy_call",
      │     intent: "hire",
      │     scene: "solutions",
      │     action: "cta_strategy_call",
      │     service: "erp-odoo-integration",
      │     location: "hero"
      │   })
      │
      ▼
Google Tag Manager (GTM-T45H6MZF)
      │
      ▼
GA4
      │
      ├── Events
      ├── Conversions
      └── Audiences
```

Implementation: `src/lib/analytics.js` (`dataLayer.push` only — never a second `gtag()` config while GTM is present).

## Taxonomy

Keep three dimensions consistent, plus allowlisted context params:

```js
track({
  intent: 'hire',
  scene: 'solutions',
  action: 'cta_strategy_call',
  service: 'erp-odoo-integration',
  location: 'hero',
})
```

| Dimension | Role |
| --- | --- |
| `intent` | Why the person is here (`explore`, `hire`, `trust`) |
| `scene` | Surface (`home`, `solutions`, `insights`, `hire`, `contact`, `nav`, …) |
| `action` / `event` | What happened (same name for core events) |

Helpers: `trackPageView`, `trackServicePageView`, `trackStrategyCall`, `trackLeadCreated`, `trackInsightOpen`, `trackCaseStudyOpen`.

**Never send PII** to GA4 (email, phone, name, message, company, free-text project notes). Payloads are allowlisted in `sanitizeAnalyticsPayload`.

## Core events

| Event | Purpose | Conversion? |
| --- | --- | --- |
| `virtual_page_view` | SPA navigation after title is applied (`usePageMeta`) | No |
| `service_page_view` | `/solutions/[slug]` engagement | No |
| `cta_strategy_call` | High-intent Book a Strategy Call | **Yes** |
| `lead_created` | Successful contact form submit | **Yes** |
| `case_study_open` | Proof/trust (when named cases exist) | No |
| `insight_open` | `/insights/[slug]` engagement | No |

Do not mark supporting events as conversions. Conversion reporting stays `lead_created` + `cta_strategy_call`.

## GTM

```text
GTM-T45H6MZF
 ├── GA4 Configuration
 │    └── All Pages
 │         └── Send a page view event: OFF
 │
 ├── GA4 Event: virtual_page_view
 │    └── Custom Event trigger (event name = virtual_page_view)
 │
 ├── GA4 Event: cta_strategy_call
 │    └── Custom Event trigger
 │
 └── GA4 Event: lead_created
      └── Custom Event trigger
```

Prefer the app’s **explicit `virtual_page_view`** over GTM History Change. Do not enable both or page views double-count.

Map Data Layer variables for analysis: `intent`, `scene`, `action`, `service`, `location`, `content`, `page_path`, `page_title`, `budget`, `lead_method`.

## Parameters

Service page CTA:

```js
trackStrategyCall({
  scene: 'solutions',
  service: 'erp-odoo-integration',
  location: 'hero',
})
```

Lead (chip → slug via `SERVICE_SLUG_BY_NEED`; empty if “Other”):

```js
trackLeadCreated({
  service: 'erp-odoo-integration',
  leadMethod: 'message',
  budget: '50k',
})
```

`location` values: `nav`, `hero`, `cta_band`, `form`.

## Funnel

```text
Organic Search
      ↓
Landing Page          →  virtual_page_view
      ↓
Service Page View     →  service_page_view
      ↓
CTA Click             →  cta_strategy_call   (conversion)
      ↓
Contact Form
      ↓
Lead Created          →  lead_created        (conversion)
```

Page-level example:

```text
/solutions/erp-odoo-integration
        ↓
Odoo integration consultant
        ↓
service_page_view
        ↓
cta_strategy_call
        ↓
lead_created
```

That answers “which landing pages generate leads?” rather than only “which pages get impressions?”

## Search Console grouping

Submit `https://gauravnagarkoti.tech/sitemap.xml`. Filter Performance by page (`/solutions/…`, `/insights/…`, `/work/…`, `/hire-software-architect`), not sitewide impressions.

**Brand**  
`Gaurav Nagarkoti` → `Gaurav Nagarkoti software`, `Gaurav Nagarkoti consultant`

**Commercial**  
`custom software development consultant`, `business automation consultant`, `Odoo integration consultant`, `software architect consultant`, `independent software developer`, `hire freelance software architect`, `software architect for hire`

**Decision content**  
`when to build custom software`, `custom software vs SaaS`, `agency vs independent architect`

Ignore as primaries: `IT services`, `software services`, `ERP implementation`, `custom software development` (head terms).
