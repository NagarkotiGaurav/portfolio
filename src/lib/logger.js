const LEVELS = ['debug', 'info', 'warn', 'error']

function shouldLog(level) {
  const min = import.meta.env.VITE_LOG_LEVEL || (import.meta.env.DEV ? 'debug' : 'info')
  return LEVELS.indexOf(level) >= LEVELS.indexOf(min)
}

function emit(level, message, context) {
  if (!shouldLog(level)) return
  const entry = {
    ts: new Date().toISOString(),
    level,
    message,
    ...(context && typeof context === 'object' ? { context } : {}),
  }
  const line = `[Gaurav] ${entry.ts} ${level.toUpperCase()} ${message}`
  if (level === 'error') {
    console.error(line, context ?? '')
  } else if (level === 'warn') {
    console.warn(line, context ?? '')
  } else {
    console.info(line, context ?? '')
  }
}

export const logger = {
  debug: (message, context) => emit('debug', message, context),
  info: (message, context) => emit('info', message, context),
  warn: (message, context) => emit('warn', message, context),
  error: (message, context) => emit('error', message, context),
}
