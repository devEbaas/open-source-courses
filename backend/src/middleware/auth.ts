import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { env } from '../config/env'

export interface AuthRequest extends Request { userId?: number }

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '')
    if (!token) return res.status(401).json({ error: 'No autorizado' })
    const decoded = jwt.verify(token, env.jwtSecret) as { id: number }
    req.userId = decoded.id
    next()
  } catch (e) {
    return res.status(401).json({ error: 'Token inválido' })
  }
}
