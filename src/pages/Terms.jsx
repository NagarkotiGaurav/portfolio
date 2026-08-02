import { Link } from 'react-router-dom'
import { BRAND } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Terms() {
  usePageMeta('/terms')

  return (
    <article className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-headline-md md:font-headline-md text-primary mb-4">
        Terms of Service
      </h1>
      <p className="font-mono-data text-mono-data text-on-surface-variant mb-12">
        Last updated: 2 August 2026
      </p>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Acceptance</h2>
          <p>
            By accessing this website you agree to these terms. If you do not agree, do not use the
            site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Services</h2>
          <p>
            {BRAND.name} provides engineering consultancy information and a channel to request
            engagement. Website content is informational and does not constitute a binding offer,
            professional advice for your specific situation, or a guarantee of outcomes.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Engagements</h2>
          <p>
            Paid consulting work is governed by a separate written agreement (statement of work,
            master services agreement, or equivalent). Those documents control project scope, fees,
            intellectual property, confidentiality, and liability.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Acceptable use</h2>
          <p>You may not misuse the site, including by submitting unlawful content, attempting to
            disrupt service, scraping at abusive rates, or impersonating others when contacting us.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Intellectual property</h2>
          <p>
            Site design, copy, and branding are owned by {BRAND.legalName} or its licensors. You may
            not copy or redistribute site materials for commercial use without written permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Limitation of liability</h2>
          <p>
            To the fullest extent permitted by law, {BRAND.name} is not liable for indirect,
            incidental, or consequential damages arising from use of this website. Nothing in these
            terms excludes liability that cannot be excluded under applicable law.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Contact</h2>
          <p>
            For questions about these terms, email{' '}
            <a className="text-primary underline" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>{' '}
            or use the{' '}
            <Link className="text-primary underline" to="/contact">
              contact form
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  )
}
