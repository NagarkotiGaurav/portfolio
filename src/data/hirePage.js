/**
 * Hire-intent landing at /hire-software-architect.
 * Commercial conversion page — no invented volumes, rankings, or case metrics.
 */

export const HIRE_PATH = '/hire-software-architect'

export const HIRE_PAGE = {
  path: HIRE_PATH,
  crumb: 'Hire',
  title: 'Hire a Freelance Software Architect | Gaurav Nagarkoti',
  description:
    'Independent software architect in India for US, UK, and EU operators. English delivery, USD, systems you own. Architecture review, blueprint & build, or ongoing guidance. Book a strategy call.',
  h1: 'Hire a Freelance Software Architect — Remote for US, UK & EU Operators',
  crawlText:
    'Gaurav Nagarkoti is an independent software architect based in India who works remotely with operators in the United States, United Kingdom, and Europe. Engagements are in English and billed in USD. Hire for an architecture review, blueprint plus build, or ongoing guidance. He designs and builds custom software, web applications, business automation, ERP integrations, ecommerce systems, and internal platforms — with architecture decisions and systems the client team owns. Book a strategy call.',
  eyebrow: 'Hire',
  answerBlock:
    'Independent architect. Remote English delivery. USD. You own the systems. I am based in India and work with US, UK, and EU operators — not a rotating bench, not managed IT.',
  definition:
    'Gaurav Nagarkoti is an independent software architect based in India who works remotely with operators in the United States, United Kingdom, and Europe. Engagements are in English and billed in USD. He designs and builds custom software, web applications, business automation, ERP integrations, ecommerce systems, and internal platforms — with architecture decisions and systems the client team owns.',
  offers: [
    { label: 'Custom software', to: '/solutions/custom-software-development' },
    { label: 'Web applications', to: '/solutions/web-application-development' },
    { label: 'Business automation', to: '/solutions/business-automation' },
    { label: 'ERP / Odoo', to: '/solutions/erp-odoo-integration' },
    { label: 'Ecommerce & payments', to: '/solutions/ecommerce-payments' },
    { label: 'Architecture', to: '/solutions/software-architecture' },
  ],
  forWho: [
    'Founders, operators, and technical leads who need architecture plus delivery ownership.',
    'Teams comparing an independent architect with an agency, a marketplace hire, or staff-aug.',
    'US, UK, and EU buyers who want English, USD, remote collaboration, and a stack their team can run after launch.',
  ],
  notFor: [
    'Helpdesk, managed IT, or device support.',
    'A rotating junior bench or a blended-rate staff-aug roster.',
    'Slideware-only strategy with no path to implementation.',
    'The cheapest anonymous marketplace bid.',
    'Enterprise RFPs that require a 100-person firm and named account teams.',
  ],
  buildModes: [
    {
      heading: 'Starting a new product',
      body: 'Stack choices, data model, auth, and deploy foundations — so the first version is not throwaway debt.',
      links: [
        { label: 'Custom software', to: '/solutions/custom-software-development' },
        { label: 'Web applications', to: '/solutions/web-application-development' },
        { label: 'When to build', to: '/insights/when-to-build-custom-software' },
      ],
    },
    {
      heading: 'Stabilising what you already have',
      body: 'Tangled flows, fragile boundaries, code nobody wants to hire into. Written recommendations, then a sequence your team can run.',
      links: [{ label: 'Software architecture', to: '/solutions/software-architecture' }],
    },
  ],
  shapes: [
    {
      heading: 'Architecture review',
      body: 'Time-boxed look at the codebase and constraints. Written recommendations — blueprint-oriented, not a vanity deck. Scoped after a strategy call, not sold as a cheap ticket.',
    },
    {
      heading: 'Blueprint + build',
      body: 'Discovery, then an architecture blueprint where the risk is architectural, then phased delivery. Client-owned repos, accounts, and documentation.',
    },
    {
      heading: 'Ongoing guidance',
      body: 'A regular cadence: roadmap clarity, reviews, and architectural decisions while work ships. Hands-on where the risk is real — not a fractional title that never opens the codebase.',
    },
  ],
  compare: [
    {
      alternative: 'Agency',
      difference: 'You work with the architect directly — no account-layer hand-offs, no surprise team swaps mid-project.',
    },
    {
      alternative: 'Staff-aug / offshore bench',
      difference: 'Not seats and not a rotating junior roster sold as a blended rate. Named senior ownership.',
    },
    {
      alternative: 'Marketplace matching',
      difference: 'Direct relationship and a process you can inspect on this site. The product is the work, not a matching theatre.',
    },
    {
      alternative: 'Fractional-CTO-only',
      difference: 'Strategy with a path to implementation. Hands-on where architecture risk is real — not slides-only.',
    },
    {
      alternative: 'Managed IT / helpdesk',
      difference: 'Out of scope. Custom software, integrations, and architecture only.',
    },
  ],
  trust: [
    'English delivery.',
    'USD commercials. The contact form uses ranges from $50k. Smaller architecture reviews are scoped after a call.',
    'Based in India, with overlap for US mornings and UK/EU afternoons.',
    'You own the systems: code, cloud accounts as scoped, and decisions written down for your team.',
    'Direct partnership. You hire the architect — not a staff-aug bench.',
    'Typical reply within 24 hours.',
  ],
  bring: [
    'The problem in one paragraph (new product, rescue, automation, internal platform, ecommerce, ERP).',
    'Constraints: timeline, team size, must-keep systems, region or compliance needs if any.',
    'What “done” looks like in 30–90 days.',
    'Whether you need review-only, blueprint + build, or ongoing guidance.',
    'Who owns decisions on your side (founder, CTO, agency PM).',
  ],
  faqs: [
    {
      question: 'Do you work with companies in the US, UK, and Europe?',
      answer:
        'Yes. Engagements are remote. Delivery is in English. Commercials are in USD. I am based in India and overlap with US mornings and UK/EU afternoons. You hire the architect — not a staff-augmentation bench.',
    },
    {
      question: 'What does a freelance software architect engagement include?',
      answer:
        'Architecture decisions and a path to delivery: a review, blueprint plus build, and/or ongoing guidance. Work spans custom software, automation, ERP, ecommerce, and internal platforms — systems your team owns after launch.',
    },
    {
      question: 'Are you an agency or an offshore body shop?',
      answer:
        'No. I work as an independent technology consultant and software architect — direct partnership, no layered account managers, no rotating bench sold as a blended rate.',
    },
    {
      question: 'Do you only advise, or do you also build?',
      answer:
        'Both. Written architecture where the risk warrants it, then phased build. Ongoing guidance can include reviews and hands-on work. This is not slides-only.',
    },
    {
      question: 'Who owns the code and systems after launch?',
      answer:
        'You do. Engagements are designed so your team can own the stack — repos, accounts, and documentation as scoped. I do not keep the keys as a lock-in.',
    },
    {
      question: 'How does an engagement typically start?',
      answer:
        'Book a strategy call or send a short brief. We clarify goals, constraints, and success criteria first. Where the risk is architectural, I produce a blueprint before heavy build work.',
    },
    {
      question: 'What kinds of projects do you take?',
      answer:
        'Custom software, commerce platforms, internal HR/CRM, WhatsApp and workflow automation, ERP/CRM integration, AI learning products, and architecture work for operators who need clarity and ownership.',
    },
    {
      question: 'Do you offer managed IT or helpdesk?',
      answer:
        'No. I do not sell helpdesk, device support, or staff augmentation. I design and build custom software, integrations, and architecture.',
    },
    {
      question: 'How long do projects take?',
      answer:
        'It depends on scope. Some architecture reviews finish in days; larger builds run for weeks or months in clear phases. Timeline expectations are set after discovery — not before.',
    },
  ],
}

export function getHirePageByPath(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return normalized === HIRE_PATH ? HIRE_PAGE : null
}
