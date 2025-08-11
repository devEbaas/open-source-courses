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

app.get("/ping", (_req: Request, res: Response) => res.status(200).json({ message: "pong" }));

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
    console.log("[backend] DB conectado (Sequelize)");
  } catch (e) {
    console.error("[backend] Error conectando a la DB, reintentando en 5s", e);
    setTimeout(connectToDatabase, 5000); // reintenta sin bloquear
  }
}

start();
