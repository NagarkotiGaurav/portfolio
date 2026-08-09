import { createGoogleSheetsProvider } from './googleSheets.js'
import { createTelegramProvider } from './telegram.js'

/**
 * @param {Record<string, string>} env
 * @param {ReturnType<import('./logger.js').createLogger>} logger
 */
export function createLeadProviders(env, logger) {
  return [createTelegramProvider(env, logger), createGoogleSheetsProvider(env, logger)]
}

export function getProviderStatus(providers) {
  return Object.fromEntries(providers.map((provider) => [provider.name, provider.isConfigured()]))
}
