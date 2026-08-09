import cors from 'cors'
import express from 'express'
import { processContact, processHealth } from '../functions/lib/handleContact.js'
import { createLogger } from '../functions/lib/logger.js'

const PORT = Number(process.env.PORT) || 8787
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const logger = createLogger(process.env)
const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(express.json({ limit: '32kb' }))
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes('*')) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed'))
    },
  }),
)

app.get('/health', (_req, res) => {
  const result = processHealth(process.env)
  res.status(result.status).json(result.body)
})

app.get('/api/contact', (_req, res) => {
  const result = processHealth(process.env)
  res.status(result.status).json(result.body)
})

app.post('/api/contact', async (req, res) => {
  const result = await processContact({
    body: req.body,
    requestLike: req,
    env: process.env,
  })
  res.status(result.status).json(result.body)
})

app.use((err, _req, res, _next) => {
  if (err?.message === 'Origin not allowed') {
    res.status(403).json({ ok: false, message: 'Origin not allowed.' })
    return
  }
  logger.error('server.error', { error: err instanceof Error ? err.message : String(err) })
  res.status(500).json({ ok: false, message: 'Unexpected server error.' })
})

app.listen(PORT, () => {
  logger.info('server.listening', { port: PORT, allowedOrigins: ALLOWED_ORIGINS })
})
