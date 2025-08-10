import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { testSequelizeConnection, listCourses } from './sequelize';
const app = express();
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';
app.use(cors({
    origin: CORS_ORIGIN,
}));
app.use(express.json());
app.get('/ping', (_req, res) => {
    res.json({ message: 'pong' });
});
app.get('/courses', async (_req, res) => {
    try {
        const rows = await listCourses(100);
        res.json(rows);
    }
    catch (e) {
        console.error('Error fetching courses', e);
        res.status(500).json({ error: 'DB error' });
    }
});
async function start() {
    try {
        await testSequelizeConnection();
        console.log('[backend] DB conectado (Sequelize)');
        app.listen(PORT, () => {
            console.log(`[backend] listening on http://localhost:${PORT}`);
        });
    }
    catch (e) {
        console.error('[backend] No se pudo conectar a la DB', e);
        process.exit(1);
    }
}
start();
