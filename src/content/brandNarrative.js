import { BRAND } from '../data/site'

/**
 * Brand narrative — single source for copy/voice/CTA/trust.
 * @see docs/Brand.md
 */
export const Narrative = {
  vision: 'Software that businesses rely on—clear, scalable, and owned by the team that runs it.',
  mission: 'Help operators remove technical friction so the business can grow faster.',
  positioning:
    'Independent technology consultant and software architect—not a layered agency.',
  voice: 'First-person, direct, outcome-led.',
  tone: 'Calm confidence. No fluff.',
  valueProposition: BRAND.valueProposition,
  ctaStyle: {
    primary: 'Book a Strategy Call',
    secondary: 'See Selected Work',
  },
  trustSignals: [
    { id: 'projects', label: 'Projects Delivered', value: '120+' },
    { id: 'years', label: 'Years Experience', value: '12' },
    { id: 'tech', label: 'Technologies', value: '15+' },
    { id: 'satisfaction', label: 'Client Satisfaction', value: '99%' },
    { id: 'availability', label: 'Availability', value: 'Accepting new projects' },
  ],
  roles: BRAND.roles,
  name: BRAND.name,
  shortName: BRAND.shortName,
}

export default Narrative
