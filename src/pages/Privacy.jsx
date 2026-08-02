import { Link } from 'react-router-dom'
import { BRAND } from '../data/site'
import { usePageMeta } from '../hooks/usePageMeta'

export default function Privacy() {
  usePageMeta('/privacy')

  return (
    <article className="max-w-3xl mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <h1 className="font-display-lg-mobile text-display-lg-mobile md:text-headline-md md:font-headline-md text-primary mb-4">
        Privacy Policy
      </h1>
      <p className="font-mono-data text-mono-data text-on-surface-variant mb-12">
        Last updated: 2 August 2026
      </p>

      <div className="space-y-8 font-body-md text-body-md text-on-surface-variant">
        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Who we are</h2>
          <p>
            {BRAND.description} This policy explains how we handle personal information collected
            through this website and our contact channels.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Information we collect</h2>
          <p>When you submit the contact form or email us, we may collect:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Name, company, email address, and optional phone number</li>
            <li>Project description, industry, timeline, and budget range</li>
            <li>Technical metadata such as submission time and browser user agent (server logs)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">How we use information</h2>
          <p>We use submitted information solely to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Respond to inquiries and schedule discovery conversations</li>
            <li>Evaluate project fit and prepare proposals</li>
            <li>Maintain records required for legitimate business operations</li>
          </ul>
          <p>We do not sell personal information.</p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Retention</h2>
          <p>
            Inquiry records are retained for as long as needed to manage the conversation and for a
            reasonable period afterward for legitimate business and legal purposes, then deleted or
            anonymized.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Your rights</h2>
          <p>
            Depending on your jurisdiction, you may request access, correction, or deletion of
            personal data we hold about you. Contact{' '}
            <a className="text-primary underline" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>{' '}
            to make a request.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="font-headline-sm text-headline-sm text-primary">Contact</h2>
          <p>
            Questions about this policy: {BRAND.location}. Email{' '}
            <a className="text-primary underline" href={`mailto:${BRAND.email}`}>
              {BRAND.email}
            </a>
            . You can also reach us via our{' '}
            <Link className="text-primary underline" to="/contact">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </article>
  )
}
