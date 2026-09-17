/**
 * Named case studies from shipped work. Client identities withheld under NDA.
 * Constraints and architecture only — no invented revenue, conversion, or traffic numbers.
 */

const NDA =
  'Client name, domains, and screenshots are withheld under NDA. The system shape is what I can publish.'

export const PROJECTS = [
  {
    slug: 'corporate-gifting-marketplace',
    path: '/work/corporate-gifting-marketplace',
    servicePath: '/solutions/ecommerce-payments',
    related: ['licensed-brand-merchandise', 'internal-crm-platform'],
    featured: true,
    client: 'Confidential',
    crumb: 'Gifting marketplace',
    title: 'Corporate Gifting Marketplace | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: a corporate gifting marketplace with a regional storefront — catalog, sellers, buyers, and branded ordering on one stack.',
    h1: 'A corporate gifting marketplace the operator can actually run.',
    crawlText:
      'Confidential case study: corporate gifting marketplace with a regional storefront. Independent architect Gaurav Nagarkoti designed catalog, seller, buyer, and branded-order flows so merchandising and fulfillment share one system of record. Client identity withheld under NDA.',
    eyebrow: 'Commerce platform',
    answerBlock:
      'A gifting operator needed a real marketplace — not a brochure site with a cart bolted on. The work was catalog, sellers, buyers, logo/artwork approval, and a regional storefront on one commercial core. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Corporate gifting looks simple from the homepage: pick a kit, upload a logo, pay. The real system is inventory, seller onboarding, artwork approval, regional catalogs, and an operator who has to know what is sellable today.',
      'I treated the primary marketplace and the regional storefront as one product with two surfaces — same commercial objects, different merchandising and locale — so the team was not maintaining two shops that drift apart.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'A gifting marketplace fails when catalog, branding, and fulfillment disagree. Sellers need a path to list. Buyers need kits they can approve. Operators need one place that is true.',
          'The regional URL is not a second company. It is another surface on the same platform. The architecture had to allow locale and assortment without cloning the stack.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'Product and kit catalog, seller and buyer journeys, branded artwork approval, and checkout that can survive real order volume — not a theme with a plugin list.',
          'The regional storefront shares the commercial core. Regional merchandising sits on top of the same SKUs, orders, and seller records so ops is not reconciling two databases.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'This is multi-sided commerce: more than one actor, more than one storefront, and an operator in the middle. That is the class of problem US and European teams hit when they outgrow Shopify-plus-spreadsheets.',
          'I do not publish the client’s GMV or the live domain. The proof is the shape of the system — ownership, not a vanity metric.',
        ],
      },
    ],
    stack: [
      'Multi-storefront commerce',
      'Seller and buyer accounts',
      'Catalog and kitting',
      'Artwork / brand approval',
      'Order and payment flow',
    ],
    faqs: [
      {
        question: 'Was the regional storefront a different build?',
        answer:
          'No. It is a second storefront on the same platform. Separate merchandising, same commercial objects.',
      },
      {
        question: 'Why is the client not named?',
        answer:
          'NDA. I describe the architecture I can stand behind. I do not publish brand, domain, or internal numbers.',
      },
    ],
  },
  {
    slug: 'licensed-brand-merchandise',
    path: '/work/licensed-brand-merchandise',
    servicePath: '/solutions/ecommerce-payments',
    related: ['corporate-gifting-marketplace', 'eyewear-ecommerce'],
    featured: false,
    client: 'Confidential',
    crumb: 'Licensed merch shop',
    title: 'Licensed Brand Merchandise Store | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: licensed merchandise storefront — catalog, checkout, shipping, and brand-safe merchandising for an official shop.',
    h1: 'A licensed brand store that has to look official — and still take orders.',
    crawlText:
      'Confidential case study: licensed merchandise ecommerce. Gaurav Nagarkoti built the catalog, checkout, and fulfillment path for an official brand shop. Client and trademark withheld under NDA.',
    eyebrow: 'Brand commerce',
    answerBlock:
      'A licensee needed a merchandise shop the parent brand could stand behind: apparel, accessories, kids lines, and an order path that does not embarrass the trademark. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Licensed merchandise is not a generic store. Product photography, collections, tax display, and shipping copy all sit next to a global brand. If checkout or catalog quality slips, the brand owns the embarrassment.',
      'I built the shop as a real catalog business: collections, product detail, cart, and regional fulfillment messaging — not a landing page with a “buy” button.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'Brand stores fail in two directions: too much customization (un-upgradable soup) or too little (a template that does not match how the licensee actually sells).',
          'This shop had to stay on-brand for a manufacturer whose customers expect industrial seriousness even on a cap.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'Collection architecture, product pages, cart, and the operational copy operators need: processing time, carriers, and returns contact.',
          'The store is a commerce surface in a broader merchandise program — connected to how that team sells branded goods, not a one-off microsite that nobody can update.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'If you need a regional brand shop, a licensee store, or a merch channel that must not look amateur next to the parent brand, this is the pattern.',
          'I will not invent conversion rates or name the trademark. The engagement question is whether your brand constraints are similar.',
        ],
      },
    ],
    stack: ['Catalog commerce', 'Collections and merchandising', 'Checkout', 'Regional shipping copy', 'Brand-safe UI'],
    faqs: [
      {
        question: 'Was this a theme tweak?',
        answer:
          'The work was the store as a selling system: catalog structure, brand constraints, and order path. Theme-only decoration is not the case study.',
      },
      {
        question: 'Why is the brand not named?',
        answer: 'NDA. Licensed trademarks stay off this site.',
      },
    ],
  },
  {
    slug: 'internal-hrms-platform',
    path: '/work/internal-hrms-platform',
    servicePath: '/solutions/custom-software-development',
    related: ['internal-crm-platform', 'n8n-whatsapp-automation'],
    featured: false,
    client: 'Confidential',
    crumb: 'Internal HRMS',
    title: 'Internal HRMS Platform | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: internal HRMS — employee records, attendance, leave, and HR operations on a system the team owns.',
    h1: 'HR operations as software the company owns.',
    crawlText:
      'Confidential case study: internal HRMS. Independent architect Gaurav Nagarkoti built an owned human-resources system for employee records, attendance, leave, and HR ops. Client identity withheld under NDA.',
    eyebrow: 'Internal platform',
    answerBlock:
      'An operator needed HR software that matched how they actually hire, onboard, and run attendance — not a 200-feature HRIS they would use twelve screens of. Authenticated. No employee data published. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Most growing companies buy an HRIS and then fight it. This team needed HR software shaped to their operation.',
      'I built an internal HRMS. Login-walled on purpose. The case study is the system shape, not a tour of private records.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'HR is a system of record. If attendance, leave, and the employee file disagree, payroll and compliance become archaeology.',
          'The product had to be operable by HR, not only by the original developer. That is an architecture constraint: roles, auditability, and a model HR can explain.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'Employee records and the operational loops around them — attendance, leave, and the documents HR actually touches — in one application the company hosts and owns.',
          'Integrations and exports are scoped to what ops needs next. The point of an owned HRMS is that those connections are yours, not a vendor roadmap.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'If your “HR stack” is three tools and a spreadsheet, this is the class of build: an internal platform with a clear owner, not another seat license.',
          'US and EU teams often have stricter data-residency and access rules. Those are discovery items. I do not claim this HRMS is a certified payroll product for every jurisdiction.',
        ],
      },
    ],
    stack: ['Internal web application', 'Role-based access', 'People and attendance records', 'HR workflows'],
    faqs: [
      {
        question: 'Can I see a demo login?',
        answer:
          'No. It is an internal system. Credentials and the live host stay with the client.',
      },
      {
        question: 'Is this a replacement for Workday?',
        answer:
          'No. It is an owned HR operations system for this company. Enterprise HRIS replacement is a different, longer engagement and would be scoped honestly.',
      },
    ],
  },
  {
    slug: 'internal-crm-platform',
    path: '/work/internal-crm-platform',
    servicePath: '/solutions/custom-software-development',
    related: ['internal-hrms-platform', 'corporate-gifting-marketplace'],
    featured: false,
    client: 'Confidential',
    crumb: 'Internal CRM',
    title: 'Internal CRM Platform | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: internal CRM — accounts, pipeline, and the handoff into how the business actually sells.',
    h1: 'A CRM that matches how the team sells.',
    crawlText:
      'Confidential case study: internal CRM. Gaurav Nagarkoti built commercial records into a system the operator owns. Authenticated. Client identity withheld under NDA.',
    eyebrow: 'Internal platform',
    answerBlock:
      'A commercial team needed a CRM they would actually use — accounts and pipeline shaped to this business, not a generic seat they abandon after onboarding. Login-walled. No customer lists published. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Unused CRMs are expensive. The failure mode is forcing a vendor’s objects onto a sales motion that does not match.',
      'I built CRM software around how this company actually sells — so the record of who is being sold, and where the deal sits, is in a system they own.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'If CRM is not the system of record, WhatsApp and inboxes are. Then nobody can forecast, and every new hire invents their own tracker.',
          'The CRM had to connect to how the company already sells — not pretend they are a generic SaaS funnel.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'An internal CRM application: commercial entities, pipeline stages the team recognizes, and access control so the file is not a shared spreadsheet.',
          'Handoffs to other systems (commerce, HR, ops automation) stay explicit. The CRM does not have to be the entire company.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'Owned CRM is the right move when the sales process is the advantage — or when the vendor CRM has become a graveyard of unused modules.',
          'I will not quote pipeline percentages or name the client. If you need Salesforce implementation, say so; that is a different engagement than building the system.',
        ],
      },
    ],
    stack: ['Internal web application', 'Accounts and pipeline', 'Role-based access', 'Ops handoff'],
    faqs: [
      {
        question: 'Why not HubSpot?',
        answer:
          'Buy when the process is generic. Build when the objects and stages are yours. Discovery is how we decide — this CRM exists because the generic shape was not enough.',
      },
      {
        question: 'Why is the client not named?',
        answer: 'NDA. Commercial data and the host stay private.',
      },
    ],
  },
  {
    slug: 'n8n-whatsapp-automation',
    path: '/work/n8n-whatsapp-automation',
    servicePath: '/solutions/business-automation',
    related: ['internal-crm-platform', 'ai-personal-tutor'],
    featured: true,
    client: 'Confidential',
    crumb: 'WhatsApp + n8n',
    title: 'WhatsApp Automation with n8n | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: WhatsApp operations automation on n8n — inbound messages, routing, and workflow bits that used to live in a human inbox.',
    h1: 'WhatsApp as an operations channel — not a chatbot toy.',
    crawlText:
      'Confidential case study: WhatsApp business automation using n8n. Gaurav Nagarkoti built workflow bits that take inbound messages, route them, and write back to the systems operations already uses. Client identity withheld under NDA.',
    eyebrow: 'Automation',
    answerBlock:
      'WhatsApp is where a lot of real work already happens: order status, seller questions, internal pings. I built n8n automations around those bits — inbound message, classify, route, write back to the system of record — so the inbox is not the architecture. ' +
      NDA,
    liveUrls: [],
    intro: [
      '“WhatsApp automation” is usually a vendor demo that cannot touch your orders. The useful version is boring: webhooks, templates you are allowed to send, and a workflow that fails visibly.',
      'I used n8n as the orchestration layer. Each bit is a workflow with an owner — not a single mega-bot that nobody can debug.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'WhatsApp Business API is strict: templates, 24-hour windows, phone quality. Unofficial libraries get numbers banned. The automation had to stay on a path Meta will not kill.',
          'Ops needed small, inspectable flows (the “bits”) — status, routing, alerts — not one agent that claims to do everything.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'n8n workflows: receive WhatsApp events, branch on intent or message type, call internal APIs or stores the team already trusts, and reply through the official send path.',
          'Failures are visible in the workflow, not swallowed by a black-box vendor. That is the difference between automation you can operate and a chatbot you restart when it lies.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'US and European operators use WhatsApp, SMS, or Slack the same way: as an accidental system of record. The pattern is identical — official channel, workflow engine, write-back to the real database.',
          'I will not claim hours saved or publish the business number. If you want this, bring the three message types that actually burn payroll.',
        ],
      },
    ],
    stack: ['n8n', 'WhatsApp Business API', 'Webhooks', 'Routing and templates', 'Write-back to ops systems'],
    faqs: [
      {
        question: 'Is this a public bot I can message?',
        answer:
          'No. These are operational workflows on a client number. The case study is the architecture, not a demo chat.',
      },
      {
        question: 'Do you only automate WhatsApp?',
        answer:
          'WhatsApp was the channel here. The same n8n pattern applies to email, Slack, or SMS if that is where the work already lives.',
      },
    ],
  },
  {
    slug: 'eyewear-ecommerce',
    path: '/work/eyewear-ecommerce',
    servicePath: '/solutions/ecommerce-payments',
    related: ['licensed-brand-merchandise', 'corporate-gifting-marketplace'],
    featured: false,
    client: 'Confidential',
    crumb: 'Eyewear ecommerce',
    title: 'Eyewear Ecommerce Catalog | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: eyewear ecommerce — catalog, categories, and checkout for frames, sunglasses, and lenses.',
    h1: 'An eyewear shop with a real catalog — not a lookbook.',
    crawlText:
      'Confidential case study: eyewear ecommerce catalog. Gaurav Nagarkoti built category structure, product detail, and the purchase path for frames and related products. Client identity withheld under NDA.',
    eyebrow: 'Ecommerce',
    answerBlock:
      'An optical retailer needed a catalog business: categories shoppers understand, product pages that can carry variants, and a checkout path — not a brand film with a “shop” link. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Eyewear catalogs are variant-heavy: shape, gender, color, price bands. If the information architecture is wrong, paid traffic lands on a maze.',
      'I built the storefront around how people actually shop this category — men / women / kids, sunglasses vs optical, and product tiles that lead to a buyable SKU.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'Optical retail online fails when inventory, price, and product identity disagree. A frame is not a poster.',
          'The shop had to support multiple product families (optical, sun, kids, readers, solutions) without five disconnected mini-sites.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'Category navigation, product listing, product detail, and the commerce path to purchase. Merchandising (new arrivals, bestsellers) sits on the same catalog, not a separate CMS island.',
          'Pricing and promotions are catalog facts. I do not publish conversion, AOV, or the store domain.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'DTC catalog businesses in the US and UK have the same shape: variants, category SEO, and checkout that must not drop mid-funnel.',
          'Tax, prescription flows, and medical-device claims are jurisdiction-specific. This case study is catalog commerce, not a clinical claim.',
        ],
      },
    ],
    stack: ['Catalog ecommerce', 'Category IA', 'Product variants', 'Checkout'],
    faqs: [
      {
        question: 'Did you design the frames?',
        answer:
          'No. This is the software and catalog system. Product design stays with the brand.',
      },
      {
        question: 'Why is the shop not linked?',
        answer: 'NDA. I do not publish the domain.',
      },
    ],
  },
  {
    slug: 'ai-personal-tutor',
    path: '/work/ai-personal-tutor',
    servicePath: '/solutions/custom-software-development',
    related: ['n8n-whatsapp-automation', 'internal-hrms-platform'],
    featured: true,
    client: 'Confidential',
    crumb: 'AI personal tutor',
    title: 'AI Personal Tutor | Case Study — Gaurav Nagarkoti',
    description:
      'Confidential engagement: AI-assisted personal tutor for self-paced learning and quizzes — personalized paths, practice, and progress.',
    h1: 'A personal tutor that is actually a learning product.',
    crawlText:
      'Confidential case study: AI-assisted personal tutor for self-paced learning and quizzes. Gaurav Nagarkoti built personalized paths and assessments, not a generic chatbot with a course name. Client identity withheld under NDA.',
    eyebrow: 'AI product',
    answerBlock:
      'A learning product needed to be a tutor — AI-assisted, self-paced, with quizzes — so the model is accountable to progress, not just to a plausible paragraph. ' +
      NDA,
    liveUrls: [],
    intro: [
      'Most “AI tutors” are a chat box on top of unstructured content. Learners do not get a path. Teachers cannot see what was actually mastered.',
      'I built a product: self-paced material, quizzes, and personalization that can change the next step — not a demo that answers any question with equal confidence.',
    ],
    sections: [
      {
        heading: 'The constraint',
        body: [
          'Personalization is empty if there is no model of what the learner already knows. Quizzes exist to update that model, not to decorate the UI.',
          'The tutor had to be usable without a live human in the loop for every session. Mentors, if they exist in a later layer, should see progress — not re-type the syllabus.',
        ],
      },
      {
        heading: 'What I built',
        body: [
          'Self-paced learning flows, quiz and practice loops, and the learner-state that decides what comes next. The AI is a component inside that loop, not the product.',
          'I do not publish score-lift percentages or the product name. Learning products should be judged on whether a learner can finish a path and whether an operator can see where they stalled.',
        ],
      },
      {
        heading: 'What this proves for a foreign buyer',
        body: [
          'Edtech and internal training in the US and UK fail the same way: content dump plus chatbot. An owned learning product is a different build — state, assessment, and a model you can inspect.',
          'Curriculum, child safety, and FERPA/COPPA-style rules are scoped in writing if the audience is minors in those markets. This case study does not claim those certifications.',
        ],
      },
    ],
    stack: ['Learning product', 'Learner profile and path', 'Quizzes and practice', 'LLM assistance with a closed loop'],
    faqs: [
      {
        question: 'Is this ChatGPT with a prompt?',
        answer:
          'No. The product is the learning loop. The model is how some explanations and items are generated — inside constraints the application owns.',
      },
      {
        question: 'Where can I try it?',
        answer:
          'It is a confidential product engagement. Book a call if you are building a similar tutor or training system.',
      },
    ],
  },
]

const bySlug = Object.fromEntries(PROJECTS.map((project) => [project.slug, project]))
const byPath = Object.fromEntries(PROJECTS.map((project) => [project.path, project]))

export const PROJECT_PATHS = PROJECTS.map((project) => project.path)

export function getProject(slug) {
  if (!slug) return null
  return bySlug[slug] || null
}

export function getProjectByPath(pathname) {
  const normalized = pathname === '' ? '/' : pathname.replace(/\/$/, '') || '/'
  return byPath[normalized] || null
}

export function getFeaturedProjects() {
  return PROJECTS.filter((project) => project.featured)
}

export function getRelatedProjects(project) {
  if (!project?.related?.length) return []
  return project.related.map((slug) => bySlug[slug]).filter(Boolean)
}

export function getProjectsByServicePath(servicePath) {
  if (!servicePath) return []
  return PROJECTS.filter((project) => project.servicePath === servicePath)
}
