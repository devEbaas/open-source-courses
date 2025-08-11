"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireAuth = requireAuth;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const env_1 = require("../config/env");
function requireAuth(req, res, next) {
    try {
        const token = req.cookies?.token || req.headers.authorization?.replace('Bearer ', '');
        if (!token)
            return res.status(401).json({ error: 'No autorizado' });
        const decoded = jsonwebtoken_1.default.verify(token, env_1.env.jwtSecret);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}
