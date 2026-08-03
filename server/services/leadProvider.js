/**
 * @typedef {object} Lead
 * @property {string} timestamp
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} company
 * @property {string} industry
 * @property {string} projectType
 * @property {string} budget
 * @property {string} timeline
 * @property {string} preferredContact
 * @property {string} message
 * @property {string} source
 * @property {string} userAgent
 * @property {string} ip
 * @property {string} referrer
 * @property {{ source: string, medium: string, campaign: string, term: string, content: string }} utm
 * @property {string} [intent]
 * @property {string} status
 */

/**
 * @typedef {object} LeadProvider
 * @property {string} name
 * @property {() => boolean} isConfigured
 * @property {(lead: Lead) => Promise<{ skipped?: boolean } | void>} send
 */

export {}
