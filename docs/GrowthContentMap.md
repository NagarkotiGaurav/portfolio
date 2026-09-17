# Growth content map — software consulting acquisition engine

**Goal (adjusted):** Do not rank for “any software work.” Become the best answer for a **defined set of problems** you can actually deliver: custom software, web applications, business automation, ERP/Odoo integration, ecommerce/payments, and software architecture.

**Funnel:** problem search → relevant page → proof (case study) → strategy call.

**Brand line (keep):** Technology Consultant & Software Architect  
**Connector line (use on home + schema `knowsAbout`):** I design and build custom software, web applications, business automation workflows, ERP integrations, and scalable digital systems.

Do not invent traffic, rankings, or volumes. Keywords below are **intent groups**, not guaranteed SERP winners.

---

## Current site vs target

| Today | Target |
| --- | --- |
| Hub pages only (`/solutions`, `/work`, `/insights`) | Hub **plus** durable child URLs |
| Solutions as hash sections | `/solutions/[slug]` commercial pages |
| `/work` empty state | `/work/[slug]` case studies shipped |
| Insights categories with no articles | `/insights/[slug]` problem/architecture pages |
| Empty `src/content/projects` | `src/data/projects.js` — named engagements |

**URL rule:** Keep `/solutions` as the commercial hub (already in nav + sitemap). Do **not** split into a parallel `/services/` tree. If you later want `/services/*` aliases, 301 them into `/solutions/*`.

```text
HOME  /
│
├── SOLUTIONS  /solutions                          (pillar hub — leads)
│   ├── Custom software     /solutions/custom-software-development
│   ├── Web applications    /solutions/web-application-development
│   ├── Business automation /solutions/business-automation
│   ├── ERP & Odoo          /solutions/erp-odoo-integration
│   ├── Ecommerce & payments /solutions/ecommerce-payments
│   └── Architecture        /solutions/software-architecture
│
├── WORK  /work                                    (proof hub — trust)
│   └── /work/[slug]                               (case studies)
│
├── INSIGHTS  /insights                            (acquisition hub)
│   └── /insights/[slug]                           (problem + how-to pages)
│
├── INDUSTRIES  /industries                        (fit, not primary SEO)
├── PROCESS  /process                              (sales enablement)
├── WHY ME  /resources                             (trust)
└── CONTACT  /contact                              (conversion)
```

Internal link pattern (every cluster):

```text
Insight / problem page  →  matching service page  →  matching case study  →  /contact
Service page            →  2–4 insights + 1 case study + /process + /contact
Case study              →  parent service + 1 related insight + /contact
```

---

## Six commercial pages (Phase 1)

Each page: unique title/H1, 800–1,500 words, What/Who/How/When/FAQ, CTA “Book a strategy call.” Job = **leads**. Publish only stacks you have actually shipped.

### 1. Custom software development

| | |
| --- | --- |
| **URL** | `/solutions/custom-software-development` |
| **Maps to** | `software-dev` |
| **Primary intent** | Hire someone to build owned business software |
| **Keyword group** | custom software development, custom business software, software development consultant, independent software developer for business |
| **Avoid stuffing** | “freelancer / cheap developer” as H1 |
| **Proof to attach** | HRMS / multi-tenant SaaS case (when written) |
| **Supporting insights** | `/insights/when-to-build-custom-software`, `/insights/custom-software-vs-saas-buy` |

### 2. Web application development

| | |
| --- | --- |
| **URL** | `/solutions/web-application-development` |
| **Maps to** | `software-dev` (web slice) |
| **Primary intent** | Hire for a web app / product MVP / operator dashboard |
| **Keyword group** | custom web application development, business web application, hire web application developer, web app for internal operations |
| **Proof** | SaaS / HRMS / commerce admin surfaces |
| **Supporting** | `/insights/build-scalable-saas`, `/insights/nodejs-backend-architecture` |

### 3. Business automation

| | |
| --- | --- |
| **URL** | `/solutions/business-automation` |
| **Maps to** | `ai-automation` + `bpa` |
| **Primary intent** | Remove manual ops without more headcount |
| **Keyword group** | business automation consultant, workflow automation, automate business processes, custom workflow automation, CRM workflow automation |
| **Proof** | Order processing / inventory automation case |
| **Supporting** | `/insights/automate-manual-business-workflows`, `/insights/order-processing-automation`, `/insights/crm-workflow-automation` |

### 4. ERP & Odoo integration

| | |
| --- | --- |
| **URL** | `/solutions/erp-odoo-integration` |
| **Maps to** | `erp` |
| **Primary intent** | Connect ERP to storefronts, inventory, and other systems |
| **Keyword group** | ERP integration, Odoo integration, Odoo ecommerce integration, custom Odoo development, business system integration |
| **Proof** | Odoo ↔ ecommerce inventory sync case |
| **Supporting** | `/insights/odoo-ecommerce-integration`, `/insights/odoo-inventory-sync`, `/insights/custom-odoo-development` |
| **Honesty rule** | Publish this cluster only if you have real Odoo/ERP delivery experience |

### 5. Ecommerce & payment systems

| | |
| --- | --- |
| **URL** | `/solutions/ecommerce-payments` |
| **Maps to** | `ecommerce` (+ payments from work teaser) |
| **Primary intent** | Reliable checkout, gateways, order/inventory under load |
| **Keyword group** | custom ecommerce development, payment gateway integration, payment orchestration, marketplace order flow, ecommerce automation |
| **Proof** | Multi-payment gateway architecture case |
| **Supporting** | `/insights/payment-gateway-integration`, `/insights/payment-failure-handling`, `/insights/inventory-automation` |

### 6. Software architecture & system design

| | |
| --- | --- |
| **URL** | `/solutions/software-architecture` |
| **Maps to** | positioning + `cloud` |
| **Primary intent** | Review / design before (or instead of) a rewrite |
| **Keyword group** | software architect consultant, system design consultant, software architecture review, scalable application architecture, architecture for startups |
| **Proof** | Any of the three case studies (architecture section) |
| **Supporting** | `/insights/mongodb-system-design`, `/insights/api-integration-services`, `/insights/build-scalable-saas` |

Hub `/solutions` stays the index: six cards linking to the URLs above (replace hash-only sections).

---

## Case studies (Phase 2) — strongest SEO asset

Publish as `/work/[slug]`. Use real constraints. No fake SLAs. Template: Problem → Constraints → Architecture → Tradeoffs → Stack → Results (honest) → CTA.

| Slug | Title | Proves | Feeds service |
| --- | --- | --- | --- |
| `multi-payment-gateway-architecture` | Multi-payment gateway architecture | Webhooks, duplicates, order state | `/solutions/ecommerce-payments` |
| `odoo-ecommerce-inventory-sync` | Real-time inventory sync (Odoo ↔ commerce) | ERP + ecommerce problem search | `/solutions/erp-odoo-integration` |
| `multi-tenant-hrms-saas` | Multi-tenant HRMS / SaaS | Isolation, auth, roles, scaling | `/solutions/web-application-development` |
| (optional 4) | Order / workflow automation | Ops automation | `/solutions/business-automation` |
| (optional 5) | Architecture review / strangler migration | Consulting motion | `/solutions/software-architecture` |

Existing `/work` teaser (“Global Payment Infrastructure”) should become case study #1 **only if the story is real**. Otherwise rewrite from an engagement you can stand behind.

---

## Problem / insight pages (Phase 3)

Informational + commercial-investigational. 1,000–2,000 words. Open with a **What / How / Why / When / Checklist** answer block for AI search. Close with CTA to the parent service.

### Cluster A — Payments (parent: ecommerce-payments)

| URL | Intent |
| --- | --- |
| `/insights/payment-gateway-integration` | How to integrate Razorpay/Stripe/Cashfree-class gateways |
| `/insights/payment-orchestration` | Multiple providers, routing, failover |
| `/insights/payment-failure-handling` | Webhooks, idempotency, duplicate events |
| `/insights/razorpay-stripe-cashfree-integration` | India-relevant multi-gateway (only if true) |

### Cluster B — Automation (parent: business-automation)

| URL | Intent |
| --- | --- |
| `/insights/automate-manual-business-workflows` | What/when to automate |
| `/insights/order-processing-automation` | Order pipeline |
| `/insights/inventory-automation` | Stock accuracy |
| `/insights/crm-workflow-automation` | CRM → ops handoff |

### Cluster C — ERP / Odoo (parent: erp-odoo-integration)

| URL | Intent |
| --- | --- |
| `/insights/odoo-integration` | ERP integration patterns |
| `/insights/odoo-ecommerce-integration` | Storefront ↔ Odoo |
| `/insights/odoo-inventory-sync` | Exact problem query |
| `/insights/custom-odoo-development` | When to customize vs configure |

### Cluster D — Systems / SaaS (parent: web apps + architecture)

| URL | Intent |
| --- | --- |
| `/insights/build-scalable-saas` | Multi-tenant product |
| `/insights/mongodb-system-design` | Data model / consistency |
| `/insights/nodejs-backend-architecture` | API / service boundaries |
| `/insights/api-integration-services` | System-of-systems |

### Cluster E — Decision (parent: custom software + architecture)

| URL | Intent |
| --- | --- |
| `/insights/custom-software-vs-saas-buy` | Build vs buy |
| `/insights/when-to-hire-a-software-architect` | Consulting motion |
| `/insights/agency-vs-independent-architect` | Why Me, commercial |

**Do not** start 50 stubs. Ship one cluster fully (service + 1 case + 4 insights) before opening the next.

---

## What not to chase

- Head terms: `software development`, `web developer`, `freelancer`
- Pages for stacks you have not shipped
- Keyword-stuffed homepage title (keep consultant/architect)
- Parallel `/services/` tree that duplicates `/solutions/`
- Industry % proof on `/industries` until a named engagement exists

Industries stay **supporting** (healthcare, logistics, enterprise, manufacturing) with links into services—not a second set of commercial pillars.

---

## Page template (commercial)

1. H1 = outcome + service (not brand name)  
2. 40–60 word answer block (AEO)  
3. Who it is for / not for  
4. Typical problems  
5. Approach (discovery → blueprint → build → own) → link `/process`  
6. Stack you actually use  
7. Proof: 1 case study + 2 insights  
8. FAQ (visible; then FAQ schema)  
9. CTA  

## Page template (insight)

1. Direct answer  
2. Architecture / options / tradeoffs  
3. Failure modes  
4. Checklist  
5. “Need this implemented?” → service + contact  

---

## Implementation order (90 days)

**Phase 1 — core authority (weeks 1–3)**  
**Shipped in code:** routes + `PAGE_META` + sitemap + `llms.txt` for the 6 service URLs and 7 case studies. Remaining ops: confirm crawl in GSC, fill `BRAND.profiles`.

**Phase 2 — proof (weeks 3–6)**  
Work hub lists seven `/work/[slug]` documents with **client names withheld under NDA** (commerce, internal HR/CRM, WhatsApp n8n, AI tutor). Positioning is remote US/UK/EU, English, USD — not local “near me” pages.

**Phase 3 — acquisition (weeks 6–12)**  
**Shipped:** decision cluster — when to build, custom vs SaaS, agency vs independent. Next cluster (payments or Odoo) only with proof.

Later corpus (do not promise a date): 6 services + 10–20 cases + 30–60 insights. Quality over 100 thin posts.

---

## Analytics to attach later

Events: `virtual_page_view`, `service_page_view`, `cta_strategy_call`, `lead_created`, `insight_open`, `case_study_open`. Conversions in GA4: only `cta_strategy_call` and `lead_created`. In GSC, watch queries in the six intent groups plus the three decision articles — not vanity brand-only impressions. See `docs/AnalyticsStrategy.md`.

---

## Manual vs code

| You (content / ops) | Code when you say go |
| --- | --- |
| Confirm which 6 services you can honestly sell | `/solutions/[slug]` routes, meta, sitemap, llms.txt — **done**; tighten copy if a service is not yet deliverable |
| Write case studies under NDA | Anonymized `/work/[slug]` documents in `src/data/projects.js` |
| Pick first insight cluster | Decision cluster shipped in `src/data/articles.js` |
| LinkedIn/GitHub `BRAND.profiles` | Footer + sameAs already wired |
| Cloudflare AI robots + www→apex | Already documented in `deployment.md` |
