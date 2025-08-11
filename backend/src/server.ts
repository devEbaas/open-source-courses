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

app.get("/ping", (_req: Request, res: Response) => res.json({ message: "pong" }));

// app.use('/api', questionRoutes);
app.use("/auth", authRoutes);

// Rutas agrupadas
app.use('/courses', courseRoutes)
app.use('/assessments', assessmentRoutes)
// error handler al final
app.use(errorHandler)

async function start(): Promise<void> {
  try {
    await testSequelizeConnection();
    console.log("[backend] DB conectado (Sequelize)");
    app.listen(PORT, () => {
      console.log(`[backend] listening on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error("[backend] No se pudo conectar a la DB", e);
    process.exit(1);
  }
}

start();
