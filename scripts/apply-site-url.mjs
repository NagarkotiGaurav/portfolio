#!/usr/bin/env node
/**
 * Rewrites absolute origins in dist/robots.txt and dist/sitemap.xml
 * using VITE_SITE_URL (set on Render). Falls back to gauravnagarkoti.tech.
 */
import { readFileSync, writeFileSync, existsSync } from 'node:fs'
import { resolve } from 'node:path'

const PLACEHOLDER = 'https://gauravnagarkoti.tech'
const siteUrl = (process.env.VITE_SITE_URL || PLACEHOLDER).replace(/\/$/, '')

const dist = resolve(process.cwd(), 'dist')
const files = ['robots.txt', 'sitemap.xml']

for (const name of files) {
  const path = resolve(dist, name)
  if (!existsSync(path)) {
    console.warn(`[seo:urls] skip missing ${name}`)
    continue
  }
  const before = readFileSync(path, 'utf8')
  const after = before.split(PLACEHOLDER).join(siteUrl)
  writeFileSync(path, after, 'utf8')
  console.info(`[seo:urls] updated ${name} → ${siteUrl}`)
}
