"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const models_1 = require("../models");
const router = (0, express_1.Router)();
router.post('/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password)
            return res.status(400).json({ error: 'name, email, password requeridos' });
        const exists = await models_1.User.findOne({ where: { email } });
        if (exists)
            return res.status(409).json({ error: 'Email ya registrado' });
        const hash = await bcryptjs_1.default.hash(password, 10);
        const user = await models_1.User.create({ name, email, passwordHash: hash });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
        const user = await models_1.User.findOne({ where: { email } });
        if (!user)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const ok = await bcryptjs_1.default.compare(password, user.passwordHash);
        if (!ok)
            return res.status(401).json({ error: 'Credenciales inválidas' });
        const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
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
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
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
exports.default = router;
