import cors from 'cors'
import express from 'express'
import contactRoutes from './routes/contact.js'
import { logger } from './utils/logger.js'

const PORT = Number(process.env.PORT) || 8787
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

const app = express()
app.disable('x-powered-by')
app.set('trust proxy', 1)
app.use(express.json({ limit: '32kb' }))
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true)
        return
      }
      callback(new Error('Origin not allowed'))
    },
  }),
)

app.use(contactRoutes)

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
