export const SOLUTION_DOMAINS = [
  { id: 'software-dev', label: 'Software Development' },
  { id: 'ai-automation', label: 'AI & Automation' },
  { id: 'bpa', label: 'Business Process' },
  { id: 'erp', label: 'ERP & CRM' },
  { id: 'ecommerce', label: 'E-Commerce' },
  { id: 'cloud', label: 'Cloud & DevOps' },
]

export const SOLUTIONS = [
  {
    id: 'software-dev',
    num: '01',
    title: 'Software Development',
    body: 'Architecting robust, scalable custom applications designed to address unique operational requirements that off-the-shelf software cannot fulfill.',
    problems: [
      'Legacy system constraints limiting growth.',
      'Inefficient workflows causing data silos.',
      'Lack of proprietary technical leverage.',
    ],
    services: ['Full-Stack Web App', 'Native Mobile', 'Microservices'],
    clients:
      'Enterprises seeking bespoke platforms to create competitive moats or modernize aging infrastructure.',
  },
  {
    id: 'ai-automation',
    num: '02',
    title: 'AI & Automation',
    body: 'Integrating machine learning models and deterministic automation logic to reduce manual overhead and enhance decision-making accuracy.',
    problems: [
      'High volume of repetitive, error-prone tasks.',
      'Inability to extract insights from large datasets.',
      'Slow response times in customer service operations.',
    ],
    services: ['LLM Integration', 'Predictive Analytics', 'RPA'],
    clients:
      'Data-rich organizations looking to optimize operational expenditure through intelligent system design.',
  },
  {
    id: 'bpa',
    num: '03',
    title: 'Business Process',
    body: 'Mapping operational workflows end-to-end and replacing brittle manual handoffs with auditable, automated process systems.',
    problems: [
      'Cross-team processes that stall on email and spreadsheets.',
      'No single source of truth for approvals and status.',
      'Compliance and audit trails that are incomplete or after-the-fact.',
    ],
    services: ['Process Mining', 'Workflow Orchestration', 'Integration Hubs'],
    clients:
      'Operations and transformation leaders who need measurable cycle-time reduction without sacrificing control.',
  },
  {
    id: 'erp',
    num: '04',
    title: 'ERP & CRM',
    body: 'Designing and integrating enterprise resource and customer platforms so finance, operations, and go-to-market systems share coherent data contracts.',
    problems: [
      'Fragmented ERP/CRM landscapes with duplicated master data.',
      'Customizations that block upgrades and create vendor lock-in.',
      'Reporting that cannot reconcile operational and financial truth.',
    ],
    services: ['ERP Modernization', 'CRM Architecture', 'Data Migration'],
    clients:
      'Mid-market and enterprise teams consolidating systems after growth, acquisition, or regional expansion.',
  },
  {
    id: 'ecommerce',
    num: '05',
    title: 'E-Commerce',
    body: 'Building commerce platforms that sustain peak traffic, complex catalogs, and multi-channel fulfillment without sacrificing conversion quality.',
    problems: [
      'Checkout and inventory failures under promotional load.',
      'Catalog and pricing rules scattered across brittle plugins.',
      'Weak observability into funnel drop-off and fulfillment lag.',
    ],
    services: ['Headless Commerce', 'Payments Integration', 'Order Orchestration'],
    clients:
      'Retail and D2C brands that need resilient storefronts and reliable order-to-cash pipelines.',
  },
  {
    id: 'cloud',
    num: '06',
    title: 'Cloud & DevOps',
    body: 'Establishing cloud foundations, CI/CD, and operational tooling so releases are frequent, recoverable, and measurable.',
    problems: [
      'Manual deployments that introduce risk and delay.',
      'Environments that drift and cannot be reproduced.',
      'Insufficient monitoring, alerting, and incident response paths.',
    ],
    services: ['Infrastructure as Code', 'CI/CD Pipelines', 'Observability'],
    clients:
      'Engineering organizations scaling delivery velocity while tightening reliability and security baselines.',
  },
]
