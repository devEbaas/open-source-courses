import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { User } from '../models'

const router = Router()

// POST /auth/register { name, email, password }
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body as { name: string; email: string; password: string }
    if (!name || !email || !password) return res.status(400).json({ error: 'name, email, password requeridos' })
    const exists = await User.findOne({ where: { email } })
    if (exists) return res.status(409).json({ error: 'Email ya registrado' })
    const hash = await bcrypt.hash(password, 10)
    const user = await User.create({ name, email, passwordHash: hash })
    res.status(201).json({ id: user.id, name: user.name, email: user.email })
  } catch (e) {
    console.error('Error register', e)
    res.status(500).json({ error: 'DB error' })
  }
})

// POST /auth/login { email, password }
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body as { email: string; password: string }
    if (!email || !password) return res.status(400).json({ error: 'email y password requeridos' })
    const user = await User.findOne({ where: { email } })
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' })
    const ok = await bcrypt.compare(password, (user as any).passwordHash)
    if (!ok) return res.status(401).json({ error: 'Credenciales inválidas' })
    // Simple response (sin token todavía)
    res.json({ id: user.id, name: user.name, email: user.email })
  } catch (e) {
    console.error('Error login', e)
    res.status(500).json({ error: 'DB error' })
  }
})

export default router
