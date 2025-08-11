import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import { testSequelizeConnection } from "./sequelize";
import authRoutes from "./routes/auth";
import courseRoutes from './routes/course.routes';
import assessmentRoutes from './routes/assessment.routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
let dbReady = false;

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  return res.status(200).json({ message: "pong", db: dbReady ? 'ok' : 'pending' });
});

app.use("/auth", authRoutes);

app.use('/courses', courseRoutes)
app.use('/assessments', assessmentRoutes)

app.use(errorHandler)

async function start(): Promise<void> {
  app.listen(PORT, () => {
    console.log(`[backend] listening on http://localhost:${PORT}`);
    connectToDatabase();
  });
}

async function connectToDatabase(): Promise<void> {
  try {
    await testSequelizeConnection();
    dbReady = true;
    console.log("[backend] DB conectado (Sequelize)");
    // Opcional: auto sync controlado por env
    if (process.env.DB_AUTO_SYNC === 'true') {
      const { sequelize } = await import('./models');
      const force = process.env.DB_FORCE_SYNC === 'true';
      const alter = process.env.DB_ALTER_SYNC === 'true';
      console.log(`[backend] Ejecutando sequelize.sync (force=${force} alter=${alter})`);
      await sequelize.sync({ force, alter });
      console.log('[backend] sync completado');
      if (process.env.DB_AUTO_SEED === 'true') {
        console.log('[backend] Ejecutando seed inicial (DB_AUTO_SEED=true)');
        // Import dinámico para no cargar siempre
        await import('./seed/initialSeed');
      }
    }
  } catch (e) {
    dbReady = false;
    console.error("[backend] Error conectando a la DB, reintentando en 5s");
    setTimeout(connectToDatabase, 5000);
  }
}

start();
