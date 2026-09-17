/**
 * Hire-intent service pages under /solutions/[slug].
 * Humans first: no head-term stuffing. Publish only work you can actually deliver.
 */

export const SERVICE_PAGES = [
  {
    slug: 'custom-software-development',
    path: '/solutions/custom-software-development',
    domainId: 'software-dev',
    serviceName: 'Custom Software Development',
    serviceType: 'Custom Software Development Consulting',
    crumb: 'Custom Software Development',
    title: 'Custom Software Development Consultant | Gaurav Nagarkoti',
    description:
      'Hire an independent architect to design and build custom business software your team can operate after launch. Discovery, blueprint, then phased delivery.',
    h1: 'Custom software your business owns — not another vendor lock-in.',
    crawlText:
      'Custom software development consulting for operators who need systems they own: internal platforms, operator apps, and integrations. Independent architect Gaurav Nagarkoti starts with discovery and a blueprint, then builds in phases so your team can run the stack after launch. Not staff augmentation, not 24/7 helpdesk, not generic IT services.',
    eyebrow: 'Custom software',
    answerBlock:
      'Custom software development here means systems your company owns — internal platforms, operator apps, and integrations — designed so your team can run them after launch. I work as an independent architect, not an agency bench. A typical engagement starts with discovery and a blueprint, then build in phases. I am not a fit for staff augmentation, 24/7 helpdesk, or undifferentiated IT services.',
    intro: [
      'Most growing companies hit a wall where spreadsheets, bolted-on SaaS, and a patchwork of vendors cannot carry the next stage of the business. The instinct is to hire “a software company.” What you actually need is a clear system: what to build, what not to build, and who owns it after go-live.',
      'I design and build that software with you. You keep the IP. Your team gets documentation, deployment, and a shape they can extend — not a black box that only the original vendor understands.',
    ],
    whoFor: [
      'Founders and operators who need a platform only they can own.',
      'Teams blocked by a legacy system that turns every new idea into a six-month project.',
      'Businesses that have outgrown no-code and generic SaaS but are not ready for a 100-person agency.',
    ],
    whoNot: [
      'Staff augmentation or “send three developers.”',
      'Managed IT, helpdesk, or device support.',
      'Undifferentiated IT services or 24/7 operations retainers.',
    ],
    problems: [
      'Legacy systems that block every new initiative.',
      'Workflows trapped in spreadsheets and silos.',
      'No proprietary tech leverage against competitors.',
    ],
    approach: [
      'Discovery: objectives, constraints, and what “done” looks like for the business — not a feature wishlist.',
      'Architecture blueprint: boundaries, data, integrations, and what your team will operate.',
      'Phased build: ship increments you can evaluate, with ownership at each handoff.',
    ],
    stack: ['Full-stack web applications', 'APIs and service boundaries', 'Native mobile when the workflow needs it'],
    related: ['web-application-development', 'software-architecture', 'business-automation'],
    faqs: [
      {
        question: 'Do you offer IT services or managed IT?',
        answer:
          'No. I do not sell helpdesk, device management, or staff augmentation. I design and build custom software systems that your team owns after launch.',
      },
      {
        question: 'When should we build custom software instead of buying SaaS?',
        answer:
          'Build when the workflow is your advantage, when vendors cannot meet constraints, or when integrations have become the product. Buy when the process is generic. Discovery exists to make that call before you spend.',
      },
      {
        question: 'Will our team be able to maintain what you build?',
        answer:
          'That is a design constraint, not an afterthought. Blueprints, documentation, and deployment are part of delivery so you are not locked to me.',
      },
      {
        question: 'How does an engagement start?',
        answer:
          'Book a strategy call or send a brief. We clarify goals and constraints first. Where the risk is architectural, I produce a blueprint before heavy build work.',
      },
    ],
  },
  {
    slug: 'web-application-development',
    path: '/solutions/web-application-development',
    domainId: 'software-dev',
    serviceName: 'Web Application Development',
    serviceType: 'Custom Web Application Development',
    crumb: 'Web Application Development',
    title: 'Custom Web Application Development | Gaurav Nagarkoti',
    description:
      'Business web apps, operator dashboards, and product platforms — designed for real constraints, then built so your team can run them.',
    h1: 'Web applications built around how your operation actually runs.',
    crawlText:
      'Custom web application development for business platforms, operator dashboards, and product MVPs. Independent consultant Gaurav Nagarkoti designs the application around operational constraints, then builds it so your team can operate it after launch.',
    eyebrow: 'Web applications',
    answerBlock:
      'A custom web application here is a business system in the browser: operator dashboards, internal platforms, and product surfaces your customers or staff use daily. I design around how the work actually happens, then implement so your team can deploy and extend it. This is not a marketing site and not a theme bolted onto a CMS.',
    intro: [
      'Internal tools and customer-facing products fail for the same reason: they were designed around a template, not around the operation. Approvals live in email. Status lives in someone’s head. The “app” is a thin UI over a spreadsheet.',
      'I build web applications as systems — data model, access, workflows, and a UI your operators will actually use. If you need a brochure site, this is the wrong page.',
    ],
    whoFor: [
      'Teams that need an operator dashboard, admin surface, or product MVP.',
      'Companies replacing spreadsheet-and-inbox workflows with a real application.',
      'Founders who want a web platform their engineers can own.',
    ],
    whoNot: [
      'Brochure or marketing-only websites.',
      'No-code rebuilds of tools you already outgrew last year without changing the process.',
    ],
    problems: [
      'Operators bouncing between tabs to complete one job.',
      'Permissions and audit trails that appear only after something breaks.',
      'An MVP that cannot become a product without a rewrite.',
    ],
    approach: [
      'Map the jobs users actually do, including exceptions.',
      'Define the data and API contracts before painting screens.',
      'Ship a thin vertical slice, then thicken the workflows that prove themselves.',
    ],
    stack: ['Web application architecture', 'Role-based access', 'APIs your other systems can call'],
    related: ['custom-software-development', 'software-architecture', 'ecommerce-payments'],
    faqs: [
      {
        question: 'Is this the same as custom software development?',
        answer:
          'Web applications are the most common shape of custom software I build. Use this page if your need is a browser-based product or operator tool. Use custom software if the system spans mobile, integrations, or a broader platform.',
      },
      {
        question: 'Can you work with our existing backend?',
        answer:
          'Yes, when the contracts are honest. If the backend cannot support the workflow, we say so in discovery instead of wrapping it in a prettier UI.',
      },
      {
        question: 'Do you build multi-tenant SaaS?',
        answer:
          'When isolation, billing, and roles are real requirements — not buzzwords. Multi-tenant design is an architecture decision we make explicitly.',
      },
    ],
  },
  {
    slug: 'business-automation',
    path: '/solutions/business-automation',
    domainId: 'ai-automation',
    serviceName: 'Business Automation',
    serviceType: 'Business Automation Consulting',
    crumb: 'Business Automation',
    title: 'Business Automation Consultant | Gaurav Nagarkoti',
    description:
      'Replace spreadsheet and inbox workflows with systems that move work forward. Independent automation and process engineering.',
    h1: 'Automate the work that is quietly taxing your payroll.',
    crawlText:
      'Business automation consulting: workflow automation, process systems, and integrations that remove manual ops. Independent architect Gaurav Nagarkoti maps the process, then engineers systems that move work forward — not more headcount and not brittle macros.',
    eyebrow: 'Business automation',
    answerBlock:
      'Business automation here means replacing repetitive, error-prone work with systems that move status forward — orders, approvals, handoffs, and updates your team currently chase in inboxes. I map the process first, then implement workflows and integrations. I do not sell a generic RPA license or a chatbot bolted onto a broken process.',
    intro: [
      'Manual work is expensive in ways that do not show up as a line item: delayed responses, duplicated data, and people hired to be human APIs. Automation only pays if you automate the right steps and leave humans on the exceptions that need judgment.',
      'I treat automation as process engineering plus software. If the process is undefined, we define it. If a SaaS already does the job, we integrate it. If the workflow is your advantage, we build it.',
    ],
    whoFor: [
      'Ops leaders who need cycle-time reduction without losing control.',
      'Teams drowning in copy-paste between CRM, sheets, and email.',
      'Companies that tried a bot or Zap and now have a pile of fragile automations.',
    ],
    whoNot: [
      '“Add AI” with no process and no data.',
      'Fully unattended factory robotics or industrial control systems as a standalone offer.',
    ],
    problems: [
      'Repetitive tasks burning payroll every week.',
      'Approvals stuck in inboxes.',
      'No single source of truth for status.',
    ],
    approach: [
      'Process mapping: the happy path and the exceptions.',
      'Decide configure vs integrate vs build for each step.',
      'Instrument the workflow so failures are visible, not silent.',
    ],
    stack: ['Workflow orchestration', 'CRM and ops integrations', 'LLM assistance only where it is accountable'],
    related: ['custom-software-development', 'erp-odoo-integration', 'software-architecture'],
    faqs: [
      {
        question: 'Will you just add ChatGPT to our workflow?',
        answer:
          'Only where a model has a defined job, inputs, and a human fallback. Most automation ROI is still deterministic workflows and clean integrations.',
      },
      {
        question: 'How is this different from hiring an RPA vendor?',
        answer:
          'I start from the business process and the systems you already run. Screen-scraping a bad UI is a last resort, not the product.',
      },
      {
        question: 'What should we automate first?',
        answer:
          'High volume, high error cost, clear rules. Discovery produces that list so you are not automating the loudest complaint.',
      },
    ],
  },
  {
    slug: 'erp-odoo-integration',
    path: '/solutions/erp-odoo-integration',
    domainId: 'erp',
    serviceName: 'ERP and Odoo Integration',
    serviceType: 'ERP Integration Consulting',
    crumb: 'ERP & Odoo Integration',
    title: 'ERP & Odoo Integration Consultant | Gaurav Nagarkoti',
    description:
      'Connect ERP and surrounding systems — storefront, inventory, CRM — without customizations that block upgrades. Independent ERP integration, not a 50-person SI.',
    h1: 'ERP integration that keeps finance, ops, and commerce in one contract.',
    crawlText:
      'ERP and Odoo integration consulting: connect the system of record to storefront, inventory, and CRM without customizations that block upgrades. Independent consultant Gaurav Nagarkoti focuses on data contracts and integrations — not a full-suite ERP implementation program.',
    eyebrow: 'ERP & Odoo',
    answerBlock:
      'ERP work here is integration and data integrity: making finance, inventory, and go-to-market speak the same language. When the system of record is Odoo or another ERP, I connect it to storefronts, CRMs, and custom apps without burying you in upgrade-blocking customizations. I am not a 50-person systems integrator selling a multi-year full-suite rollout.',
    intro: [
      'ERP programs fail when every department gets a one-off customization and the numbers never reconcile. The useful job is usually narrower: a clean data contract, a migration you can trust, and integrations that survive the next upgrade.',
      'If you need a partner to implement every Odoo or SAP module with a 20-person team, that is not this practice. If you need the ERP to talk to the rest of the business — honestly — that is.',
    ],
    whoFor: [
      'Growing companies consolidating systems after scale or acquisition.',
      'Teams whose storefront, warehouse, and finance tools disagree on stock and orders.',
      'Operators on Odoo (or similar) who need custom modules or integrations without painting themselves into a corner.',
    ],
    whoNot: [
      'Greenfield “implement SAP for 5,000 users” programs.',
      'License resale or official product support as a substitute for the vendor.',
    ],
    problems: [
      'Duplicated master data across tools.',
      'Customizations that block upgrades.',
      'Reports that never reconcile.',
    ],
    approach: [
      'Name the system of record for each entity (SKU, customer, invoice).',
      'Prefer configuration and integration over core customizations.',
      'Migrate in slices with reconciliation, not a weekend cutover hope.',
    ],
    stack: ['ERP / Odoo integration', 'CRM architecture', 'Data migration and reconciliation'],
    related: ['ecommerce-payments', 'business-automation', 'custom-software-development'],
    faqs: [
      {
        question: 'Do you do full ERP implementation?',
        answer:
          'I do not run a large SI-style implementation factory. I design and build integrations, data models, and targeted customizations around the ERP you already run or have chosen.',
      },
      {
        question: 'Is this Odoo-only?',
        answer:
          'Odoo is a common system of record for the companies I work with. The same integration discipline applies to other ERPs: contracts first, customizations last.',
      },
      {
        question: 'Will custom Odoo modules block upgrades?',
        answer:
          'They can. That risk is named in the blueprint. We push logic to integrations and well-bounded modules instead of forking the core.',
      },
    ],
  },
  {
    slug: 'ecommerce-payments',
    path: '/solutions/ecommerce-payments',
    domainId: 'ecommerce',
    serviceName: 'Ecommerce and Payment Systems',
    serviceType: 'Ecommerce and Payment Systems Engineering',
    crumb: 'Ecommerce & Payments',
    title: 'Ecommerce & Payment Systems | Gaurav Nagarkoti',
    description:
      'Checkout, payment gateways, and order/inventory flows designed to survive peak traffic. Independent commerce engineering.',
    h1: 'Ecommerce and payments that still work when traffic spikes.',
    crawlText:
      'Ecommerce and payment systems consulting: checkout, payment gateway integration, and order/inventory flows that survive peak traffic. Independent architect Gaurav Nagarkoti designs commerce pipelines so orders, stock, and settlements stay consistent.',
    eyebrow: 'Ecommerce & payments',
    answerBlock:
      'Ecommerce work here is the path from browse to paid order to inventory and settlement — checkout, gateways, and the systems behind them. I design those flows to survive promotions and retries, not just the happy path in staging. This is engineering, not a theme install.',
    intro: [
      'Peak traffic is when brittle plugins and “it worked in staging” integrations fail. Duplicate webhooks, stock sold twice, and payment states that never match the order book are architecture problems, not luck.',
      'I treat payments and orders as a state machine with idempotency, clear ownership, and observability. Storefront cosmetics are in scope only when they sit on that foundation.',
    ],
    whoFor: [
      'Retail and D2C brands that cannot afford downtime on launch day.',
      'Teams stitching multiple gateways or marketplaces into one order pipeline.',
      'Operators whose inventory and checkout disagree under load.',
    ],
    whoNot: [
      'Shopify theme tweaks with no systems work.',
      'Payment facilitation or becoming your merchant of record.',
    ],
    problems: [
      'Checkout and inventory failures under load.',
      'Pricing rules scattered across brittle plugins.',
      'No clear view of funnel drop-off or payment failures.',
    ],
    approach: [
      'Model order and payment states, including retries and refunds.',
      'Make webhook handling idempotent; never trust a single callback.',
      'Keep inventory and checkout on one contract during promotions.',
    ],
    stack: ['Headless or API-first commerce', 'Payment gateway integration', 'Order orchestration'],
    related: ['erp-odoo-integration', 'web-application-development', 'business-automation'],
    faqs: [
      {
        question: 'Which payment gateways do you work with?',
        answer:
          'The ones your market and bank already require — designed behind a consistent order contract so you are not rewriting checkout for each provider. Named providers are confirmed in discovery, not advertised as a partnership badge.',
      },
      {
        question: 'Can you fix a store that already drops orders at peak?',
        answer:
          'Yes, starting with the failure modes: timeouts, double charges, stock drift. We stabilize the path before adding features.',
      },
      {
        question: 'Do you also connect ecommerce to ERP?',
        answer:
          'Often. Inventory and orders belong in one contract. See ERP and Odoo integration when the system of record sits outside the storefront.',
      },
    ],
  },
  {
    slug: 'software-architecture',
    path: '/solutions/software-architecture',
    domainId: 'cloud',
    serviceName: 'Software Architecture Consulting',
    serviceType: 'Software Architecture Consulting',
    crumb: 'Software Architecture',
    title: 'Software Architecture Consultant | Gaurav Nagarkoti',
    description:
      'Architecture reviews and system design before a rewrite. Clear tradeoffs, a blueprint your team can implement, independent of an agency bench.',
    h1: 'Software architecture you can implement — and explain to the business.',
    crawlText:
      'Software architecture consulting: reviews and system design before a rewrite. Independent architect Gaurav Nagarkoti produces a blueprint with tradeoffs your team can implement — cloud, APIs, and delivery included. Not a slide deck that cannot be built.',
    eyebrow: 'Architecture',
    answerBlock:
      'Software architecture consulting here is a review or a design you can implement: boundaries, data, delivery, and the tradeoffs the business is actually making. I work as an independent architect. The output is a blueprint and, when you want it, the first slices of the build — not a slide deck your team cannot execute.',
    intro: [
      'Rewrites start when nobody can explain the current system, every change feels dangerous, and vendors propose a greenfield that ignores constraints. The cheaper move is often a clear picture: what to keep, what to wrap, what to replace, and in what order.',
      'I produce that picture in language operators and engineers can both use. If you then want me to build, the blueprint is the contract — not a separate theatre.',
    ],
    whoFor: [
      'Teams about to rewrite and wanting a second architecture opinion first.',
      'Founders who need a system design their engineers can own.',
      'Companies scaling delivery and tightening reliability (CI/CD, environments, observability).',
    ],
    whoNot: [
      'Architecture-as-a-service retainers with no decision rights.',
      'Cloud migrations that are actually license-and-lift projects with no design work.',
    ],
    problems: [
      'Every feature requires touching six services and a prayer.',
      'Environments that drift and cannot be reproduced.',
      'Incidents without clear ownership or signals.',
    ],
    approach: [
      'Review the current system against the outcomes you need next quarter, not an ideal diagram.',
      'Write tradeoffs down: cost, risk, team skill, time-to-value.',
      'Leave a sequence: strangler steps, not a big-bang date.',
    ],
    stack: ['System design and reviews', 'Cloud and infrastructure as code', 'CI/CD and observability'],
    related: ['custom-software-development', 'web-application-development', 'business-automation'],
    faqs: [
      {
        question: 'Is this only a document?',
        answer:
          'The blueprint is the first deliverable. Many engagements continue into implementation. You choose that after you have seen the design, not before.',
      },
      {
        question: 'How is this different from hiring an agency architect?',
        answer:
          'You work with me directly. No layered account managers. The architecture has to be something your team can run.',
      },
      {
        question: 'Do you include cloud and DevOps?',
        answer:
          'When delivery and operations are part of the risk — environments, pipelines, and signals. Architecture that ignores how you ship is incomplete.',
      },
    ],
  },
]

const bySlug = Object.fromEntries(SERVICE_PAGES.map((page) => [page.slug, page]))
const byPath = Object.fromEntries(SERVICE_PAGES.map((page) => [page.path, page]))

export const SERVICE_PATHS = SERVICE_PAGES.map((page) => page.path)

export function getServicePage(slug) {
  if (!slug) return null
  return bySlug[slug] || null
}

export function getServicePageByPath(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return byPath[normalized] || null
}

export function getRelatedServicePages(page) {
  if (!page?.related?.length) return []
  return page.related.map((slug) => bySlug[slug]).filter(Boolean)
}
