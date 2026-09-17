/**
 * Decision-cluster insight pages. First-person frameworks only — no invented clients or metrics.
 */

export const ARTICLES = [
  {
    slug: 'when-to-build-custom-software',
    path: '/insights/when-to-build-custom-software',
    servicePath: '/solutions/custom-software-development',
    crumb: 'When to build',
    datePublished: '2026-09-17',
    title: 'When to Build Custom Software | Gaurav Nagarkoti',
    description:
      'A practical test for when custom software is the right investment versus buying a product. Written for operators who need to decide before they spend.',
    h1: 'When custom software is the right move — and when it is not.',
    crawlText:
      'How to decide when to build custom software versus buy a product. Independent consultant Gaurav Nagarkoti uses a constraint-first test: advantage, integration load, and who will own the system after launch.',
    eyebrow: 'Decision',
    answerBlock:
      'Build custom software when the workflow is your advantage, when vendors cannot meet real constraints, or when integrations have become the product. Buy when the process is generic and a product already does the job. Discovery exists to make that call before you spend — not after a rewrite is already in motion.',
    intro: [
      'Most “should we build?” conversations start in the wrong place: a feature list, a competitor’s stack, or a vendor demo. The useful question is narrower. What must be true about this operation in twelve months, and which of those truths a product can never own?',
      'I use the same test in discovery. It is not anti-SaaS. It is anti-surprise: the surprise of a six-figure custom build that should have been a subscription, or a pile of tools that cannot be the system of record.',
    ],
    sections: [
      {
        heading: 'Build when the workflow is the advantage',
        body: [
          'If two competitors can buy the same product, that product is not your edge. Custom software earns its keep when how work moves — approvals, exceptions, pricing, inventory, underwriting, dispatch — is how you win.',
          'A useful tell: your operators already maintain a shadow system (spreadsheets, inbox rules, a “temporary” database) because the bought tools refuse the exceptions. That shadow system is the real product. The question is whether you keep it accidental or make it owned.',
        ],
      },
      {
        heading: 'Buy when the process is generic',
        body: [
          'Accounting, email, HRIS basics, commodity CRM: these are rarely where a growing company should invent software. Buying is cheaper in calendar time and in the talent you do not have to staff.',
          'The failure mode is pretending a generic process is unique. If you cannot explain the constraint in one sentence that a new hire would recognize in week one, you probably do not need a custom module — you need the product used properly.',
        ],
      },
      {
        heading: 'The integration load test',
        body: [
          'Sometimes neither “build a platform” nor “buy one more SaaS” is the answer. The system is the connections: order to inventory to finance, CRM to ops, storefront to ERP. If every quarter adds another brittle Zap and a reconciliation meeting, you do not have a tooling gap. You have a contract gap.',
          'That is still software work. It is just not a greenfield app. It is an integration and data-ownership problem — which is often the highest-ROI custom work I do.',
        ],
      },
    ],
    checklist: [
      'Can you name the workflow that competitors cannot copy by buying the same SaaS?',
      'Who operates the system after launch — and can they?',
      'What is the system of record for the entities that lose money when they drift?',
      'Have you priced the cost of not deciding (shadow systems, delayed launches)?',
      'Is this a build, a buy, or an integration — and did you write that down?',
    ],
    faqs: [
      {
        question: 'How long should this decision take?',
        answer:
          'Days for a clear buy. A short discovery for anything that looks like a platform. If the decision needs months of workshops, the problem is not the software — it is the operating model.',
      },
      {
        question: 'What if we already started building?',
        answer:
          'Stop adding features until the ownership and system-of-record questions are answered. Unwinding a half-built product is cheaper than finishing the wrong one.',
      },
    ],
  },
  {
    slug: 'custom-software-vs-saas-buy',
    path: '/insights/custom-software-vs-saas-buy',
    servicePath: '/solutions/custom-software-development',
    crumb: 'Build vs buy',
    datePublished: '2026-09-17',
    title: 'Custom Software vs SaaS | Gaurav Nagarkoti',
    description:
      'Build vs buy without vendor theatre. Compare ownership, switching cost, and integration load so the business can choose with eyes open.',
    h1: 'Custom software vs SaaS: choose on ownership, not on a demo.',
    crawlText:
      'Custom software versus SaaS is an ownership decision. Independent consultant Gaurav Nagarkoti compares switching cost, data contracts, and who runs the system after go-live — not feature checklists from a sales deck.',
    eyebrow: 'Comparison',
    answerBlock:
      'SaaS wins when the process is common and you can accept the vendor’s model. Custom software wins when you must own the workflow, the data contract, or the integration surface. The demo is the least useful input. Switching cost, who operates the system, and what breaks when the vendor changes a field — those decide.',
    intro: [
      'Build vs buy arguments go in circles because both sides argue features. Features change. Ownership does not. A product you cannot leave, cannot extend, and cannot explain to your team is not cheaper because the invoice is monthly.',
      'This comparison is the one I put on the table in strategy calls. It is deliberately unglamorous.',
    ],
    sections: [
      {
        heading: 'What you actually purchase with SaaS',
        body: [
          'You purchase a model of the world: objects, permissions, and a roadmap you do not control. That is a good trade when the model matches. It is a bad trade when your exceptions are the business.',
          'Watch for plugins that re-implement your process on top of a product that will fight them at every upgrade. That is custom software with worse ownership.',
        ],
      },
      {
        heading: 'What you actually purchase with custom software',
        body: [
          'You purchase a system your team can change. You also purchase the duty to operate it: deploys, backups, the first 3 a.m. failure. If you do not want that duty, do not build — or build with an explicit handoff that includes runbooks, not a zip of source.',
          'Custom is not “more features.” Custom is “the constraints are ours.” If there are no constraints, buy.',
        ],
      },
      {
        heading: 'A third option: custom around the SaaS',
        body: [
          'Keep the product as the system of record. Build the operator surface, the sync, or the exception path next to it. This is usually cheaper than a rewrite and more honest than a graveyard of automations.',
          'The design rule: one owner per entity. Customer, SKU, invoice, order — each has a home. Everything else is a projection.',
        ],
      },
    ],
    checklist: [
      'Write the vendor’s objects vs your objects. Where they disagree, who wins?',
      'Estimate switching cost as if the vendor doubled price next year.',
      'Name the operator of last resort for production.',
      'List the three exceptions the demo skipped.',
      'Decide: buy, build, or wrap — one sentence, in writing.',
    ],
    faqs: [
      {
        question: 'Is custom always more expensive?',
        answer:
          'Up front, usually. Over three years, not if the SaaS path is a permanent integration tax and a process you cannot change. Cost is calendar plus switching cost, not the first invoice.',
      },
      {
        question: 'Can we start on SaaS and rebuild later?',
        answer:
          'Yes, if you keep clean exports and do not bury logic in irreplaceable plugins. Plan the exit while you still have leverage.',
      },
    ],
  },
  {
    slug: 'agency-vs-independent-architect',
    path: '/insights/agency-vs-independent-architect',
    servicePath: '/solutions/software-architecture',
    crumb: 'Independent vs agency',
    datePublished: '2026-09-17',
    title: 'Agency vs Independent Architect | Gaurav Nagarkoti',
    description:
      'When to hire an independent software architect instead of a layered agency. A fit check for operators who want a named senior person, not a bench.',
    h1: 'Agency vs independent architect: who should own the design?',
    crawlText:
      'When to hire an independent software architect versus an agency. Gaurav Nagarkoti works as an independent consultant: direct partnership, architecture you can implement, no layered account managers. Agencies fit staffed delivery programs; independents fit clarity and ownership.',
    eyebrow: 'Fit',
    answerBlock:
      'Hire an independent architect when you need a named senior person to design (and often build) a system your team will own. Hire an agency when you need a staffed program, parallel workstreams, and a vendor that can absorb headcount risk. I am not an agency. If you need a 20-person factory, that is a different motion — and you should buy it honestly.',
    intro: [
      '“Software company” is a blurry phrase. It covers a two-person shop, a 2,000-person SI, and a marketplace of contractors. Buyers then wonder why the architecture cannot be explained by the person still on the call.',
      'The distinction that matters is who holds the design in their head, and whether that person is still in the room after the kickoff.',
    ],
    sections: [
      {
        heading: 'What an independent is for',
        body: [
          'Clarity before spend. A blueprint your engineers can implement. A build that does not depend on an account manager translating. Direct disagreement when a request will create debt.',
          'That model fails if you need 12 concurrent workstreams or 24/7 coverage. It also fails if you want to outsource ownership. I design systems your team operates. If you want to never think about the software again, you want a product or a managed vendor — not me.',
        ],
      },
      {
        heading: 'What an agency is for',
        body: [
          'A program: many roles, a PMO, backfill when people leave. Useful for large rollouts, official partner implementations, and when procurement requires a firm with insurance and a bench.',
          'The cost is layers. Requirements pass through people who will not maintain the system. Architecture becomes a slide. You can still get good work from agencies. You should know you are buying a machine, not a person.',
        ],
      },
      {
        heading: 'A simple fit check',
        body: [
          'If the next risk is “we will build the wrong thing,” hire for design. If the next risk is “we cannot staff the work,” hire for a bench. Mixing those risks in one RFP is how you get an expensive muddle.',
          'I take the first risk. Discovery, architecture, then build in phases you can stop. The second risk belongs to an agency or to your own hiring plan.',
        ],
      },
    ],
    checklist: [
      'Who will explain the architecture in six months if the vendor is gone?',
      'Do you need a person or a program?',
      'Is 24/7 coverage a requirement or a fear?',
      'Will your team operate this, or are you buying an outcome you never want to see?',
      'Can the person designing it still be the person building the first slice?',
    ],
    faqs: [
      {
        question: 'Do you subcontract a hidden team?',
        answer:
          'No. If a specialist is required, that is explicit and agreed. You are not paying for a logo with a rotating bench.',
      },
      {
        question: 'Are you cheaper than an agency?',
        answer:
          'You are not paying for account layers. You are also not buying infinite parallel capacity. Compare against the work, not against a blended day rate on a slide.',
      },
    ],
  },
]

const bySlug = Object.fromEntries(ARTICLES.map((article) => [article.slug, article]))
const byPath = Object.fromEntries(ARTICLES.map((article) => [article.path, article]))

export const ARTICLE_PATHS = ARTICLES.map((article) => article.path)

export function getArticle(slug) {
  if (!slug) return null
  return bySlug[slug] || null
}

export function getArticleByPath(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return byPath[normalized] || null
}
