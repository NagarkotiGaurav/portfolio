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
  // Qualitative proof only until you can substantiate numeric claims (E-E-A-T).
  trustSignals: [
    { id: 'model', label: 'Engagement', value: 'Independent' },
    { id: 'focus', label: 'Focus', value: 'Architecture' },
    { id: 'ownership', label: 'Outcome', value: 'Systems you own' },
    { id: 'reach', label: 'Reach', value: 'Remote worldwide' },
    { id: 'availability', label: 'Availability', value: 'Accepting new projects' },
  ],
  roles: BRAND.roles,
  name: BRAND.name,
  shortName: BRAND.shortName,
}

export default Narrative
