import Atmosphere from './Atmosphere'
import FocusHeadline from './FocusHeadline'
import Parallax from './Parallax'
import ScrollOnce from './ScrollOnce'

/**
 * Shared page hero with atmosphere + optional word reveal + parallax depth.
 */
export default function PageHero({
  eyebrow,
  title,
  lines,
  body,
  children,
  className = '',
}) {
  return (
    <section
      className={`relative overflow-hidden border-b border-outline-variant ${className}`.trim()}
    >
      <Parallax speed={0.12} className="absolute inset-0 pointer-events-none">
        <Atmosphere />
      </Parallax>
      <ScrollOnce className="relative max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop pt-section-gap md:pt-section-gap-lg pb-16 md:pb-24">
        {eyebrow && (
          <p className="font-mono-data text-mono-data text-on-surface-variant uppercase tracking-widest mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-outline-variant" />
            {eyebrow}
          </p>
        )}
        {lines?.length ? (
          <FocusHeadline
            as="h1"
            className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tighter mb-6 md:mb-8 max-w-4xl"
            lines={lines}
          />
        ) : (
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-primary tracking-tighter mb-6 md:mb-8 max-w-4xl">
            {title}
          </h1>
        )}
        {body && (
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">{body}</p>
        )}
        {children}
      </ScrollOnce>
    </section>
  )
}
