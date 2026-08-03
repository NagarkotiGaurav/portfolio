const LEVELS = { debug: 10, info: 20, warn: 30, error: 40 }
const minLevel = LEVELS[(process.env.LOG_LEVEL || 'info').toLowerCase()] ?? LEVELS.info

function write(level, message, meta) {
  if ((LEVELS[level] ?? 99) < minLevel) return
  const line = {
    level,
    message,
    ts: new Date().toISOString(),
    ...(meta && typeof meta === 'object' ? { meta } : {}),
  }
  const out = JSON.stringify(line)
  if (level === 'error') console.error(out)
  else if (level === 'warn') console.warn(out)
  else console.log(out)
}

export const logger = {
  debug: (message, meta) => write('debug', message, meta),
  info: (message, meta) => write('info', message, meta),
  warn: (message, meta) => write('warn', message, meta),
  error: (message, meta) => write('error', message, meta),
}
