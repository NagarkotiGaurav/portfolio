function envFlag(env, name, fallback = true) {
  const raw = env?.[name]
  if (raw === undefined || raw === '') return fallback
  return !['0', 'false', 'off', 'no'].includes(String(raw).toLowerCase())
}

function read(env, key) {
  return String(env?.[key] || '').trim()
}

export function createEnvReader(env = {}) {
  return {
    flag: (name, fallback = true) => envFlag(env, name, fallback),
    get: (key) => read(env, key),
    raw: env,
  }
}
