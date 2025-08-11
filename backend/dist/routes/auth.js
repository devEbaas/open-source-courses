import { Router } from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { User } from '../models';
const router = Router();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ error: 'name, email, password requeridos' });
        const exists = await User.findOne({ where: { email } });
        if (exists)
            return res.status(409).json({ error: 'Email ya registrado' });
        const hash = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, passwordHash: hash });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en https en prod
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });
        res.status(201).json({ id: user.id, name: user.name, email: user.email, token });
    }
    catch (e) {
        console.error('Error register', e);
        res.status(500).json({ error: 'DB error' });
    }
});
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({ error: 'email y password requeridos' });
        const user = await User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const ok = await bcrypt.compare(password, user.passwordHash);
        if (!ok)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Solo en https en prod
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000, // 1 día
        });
        res.json({ id: user.id, name: user.name, email: user.email, token });
    }
    catch (e) {
        console.error('Error login', e);
        res.status(500).json({ error: 'DB error' });
    }
});
router.get('/me', async (req, res) => {
    try {
        const token = req.cookies.token;
        if (!token)
            return res.status(401).json({ error: 'No autorizado' });
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ user: decoded });
    }
    catch (e) {
        console.error('Error getting user', e);
        res.status(500).json({ error: 'DB error' });
    }
});
router.post("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Sesión cerrada" });
});
export default router;
