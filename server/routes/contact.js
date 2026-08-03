import { Router } from 'express'
import { handleContact, handleHealth } from '../controllers/contactController.js'

const router = Router()

router.get('/health', handleHealth)
router.post('/api/contact', handleContact)

export default router
