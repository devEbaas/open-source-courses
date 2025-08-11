import jwt from 'jsonwebtoken';
import { env } from '../config/env';
export function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
        if (!token)
            return res.status(401).json({ error: 'No autorizado' });
        const decoded = jwt.verify(token, env.jwtSecret);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
