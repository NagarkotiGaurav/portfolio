/**
 * Capture UTM params and traffic context from the browser.
 */
export function getLeadTrackingContext() {
  if (typeof window === 'undefined') {
    return {
      source: 'website',
      userAgent: '',
      referrer: '',
      utm: { source: '', medium: '', campaign: '', term: '', content: '' },
    }
  }

  const params = new URLSearchParams(window.location.search)
  return {
    source: 'website',
    userAgent: navigator.userAgent || '',
    referrer: document.referrer || '',
    utm: {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      term: params.get('utm_term') || '',
      content: params.get('utm_content') || '',
    },
  }
}
