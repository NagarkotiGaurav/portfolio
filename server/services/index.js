import { googleSheetsProvider } from './googleSheets.js'
import { telegramProvider } from './telegram.js'

/**
 * Active lead destinations. Add HubSpot / Notion / Slack here later —
 * the contact controller does not change.
 *
 * @type {import('./leadProvider.js').LeadProvider[]}
 */
export const leadProviders = [telegramProvider, googleSheetsProvider]

export function getProviderStatus() {
  return Object.fromEntries(
    leadProviders.map((provider) => [provider.name, provider.isConfigured()]),
  )
}
