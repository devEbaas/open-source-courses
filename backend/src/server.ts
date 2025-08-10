import "dotenv/config";
import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";
import cors from "cors";
import { testSequelizeConnection, listCourses } from "./sequelize";
import {
  sequelize as orm,
  Question,
  Answer,
  Category,
  Assessment,
  Course,
  User,
  AssessmentResult,
  AssessmentResultQuestion,
} from "./models";
// import questionRoutes from './routes/questions'
import authRoutes from "./routes/auth";

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

app.get("/ping", (_req: Request, res: Response) => {
  res.json({ message: "pong" });
});

// app.use('/api', questionRoutes);
app.use("/auth", authRoutes);

app.get("/courses", async (_req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      attributes: ["id", "name", "description"],
      include: [
        {
          model: Assessment,
          as: "assessment",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    res.json(courses);
  } catch (e) {
    console.error("Error listando cursos", e);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/courses/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id inválido" });
    const course = await Course.findByPk(id, {
      attributes: ["id", "name", "description"],
      include: [
        {
          model: Assessment,
          as: "assessment",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    if (!course) return res.status(404).json({ error: "No encontrado" });
    res.json(course);
  } catch (e) {
    console.error("Error obteniendo curso", e);
    res.status(500).json({ error: "DB error" });
  }
});

app.get("/assessments/:id", async (req: Request, res: Response) => {
  const PER_CATEGORY = 5;
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id inválido" });
    const assessment = await Assessment.findByPk(id, {
      attributes: ["id", "name", "description"],
      include: [
        {
          model: Course,
          as: "course",
          attributes: ["id", "name", "description"],
        },
      ],
    });
    if (!assessment) return res.status(404).json({ error: "No encontrado" });
    const questions = await Question.findAll({
      where: { assessmentId: id },
      include: [
        {
          model: Answer,
          as: "answers",
          attributes: ["id", "text", "isCorrect"],
        },
        { model: Category, as: "category", attributes: ["id", "name"] },
      ],
    });
    const byCat = new Map<number, any[]>();
    for (const q of questions) {
      const cid = (q as any).categoryId as number;
      if (!byCat.has(cid)) byCat.set(cid, []);
      byCat.get(cid)!.push(q);
    }
    const groups = Array.from(byCat.values())
      .slice(0, 2)
      .map((arr) => arr.slice(0, PER_CATEGORY));
    const flat = groups.flat();
    res.json({ assessment, questions: flat });
  } catch (e) {
    console.error("Error detalle assessment", e);
    res.status(500).json({ error: "DB error" });
  }
});

app.post("/assessments/:id/submit", async (req: Request, res: Response) => {
  try {
    const assessmentId = Number(req.params.id);
    if (Number.isNaN(assessmentId))
      return res.status(400).json({ error: "assessmentId inválido" });
    const { userId, answers } = req.body as {
      userId: number;
      answers: { questionId: number; answerId: number }[];
    };
    if (!userId || !Array.isArray(answers))
      return res.status(400).json({ error: "userId y answers requeridos" });
    const assessment = await Assessment.findByPk(assessmentId);
    if (!assessment)
      return res.status(404).json({ error: "Assessment no encontrado" });
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ error: "User no encontrado" });
    const questionIds = answers.map((a) => a.questionId);
    const dbQuestions = await Question.findAll({
      where: { id: questionIds, assessmentId },
      include: [{ model: Answer, as: "answers" }],
    });
    // mapa de respuestas enviadas
    const answerMap = new Map<number, number>();
    for (const a of answers) answerMap.set(a.questionId, a.answerId);
    let score = 0;
    const details: any[] = [];
    for (const q of dbQuestions) {
      const selectedAnswerId = answerMap.get(q.id) || null;
      const correct = (q as any).answers.find((ans: any) => ans.isCorrect);
      const isCorrect =
        selectedAnswerId != null && correct && correct.id === selectedAnswerId;
      if (isCorrect) score++;
      details.push({
        assessmentResultId: 0, // placeholder, actualizar luego
        questionId: q.id,
        questionText: (q as any).text,
        selectedAnswerId,
        correctAnswerId: correct ? correct.id : null,
        isCorrect,
      });
    }
    const totalQuestions = dbQuestions.length;
    const result = await AssessmentResult.create({
      userId,
      assessmentId,
      score,
      totalQuestions,
    });
    for (const d of details) d.assessmentResultId = result.id;
    await AssessmentResultQuestion.bulkCreate(details);
    res.status(201).json({ resultId: result.id, score, totalQuestions });
  } catch (e) {
    console.error("Error submit assessment", e);
    res.status(500).json({ error: "DB error" });
  }
});

// Listar resultados de un assessment para un usuario (o todos si no se pasa userId)
app.get("/assessments/:id/results", async (req: Request, res: Response) => {
  try {
    const assessmentId = Number(req.params.id);
    if (Number.isNaN(assessmentId))
      return res.status(400).json({ error: "assessmentId inválido" });
    const userId = req.query.userId ? Number(req.query.userId) : undefined;
    const where: any = { assessmentId };
    if (userId) where.userId = userId;
    const results = await AssessmentResult.findAll({
      where,
      order: [["id", "DESC"]],
    });
    res.json(results);
  } catch (e) {
    console.error("Error listando resultados", e);
    res.status(500).json({ error: "DB error" });
  }
});

// Detalle de un resultado con preguntas/respuestas snapshot
app.get("/assessment-results/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) return res.status(400).json({ error: "id inválido" });
    const result = await AssessmentResult.findByPk(id, {
      include: [
        { model: Assessment, as: "assessment", attributes: ["id", "name"] },
        { model: User, as: "user", attributes: ["id", "name", "email"] },
      ],
    });
    if (!result) return res.status(404).json({ error: "No encontrado" });
    const detail = await AssessmentResultQuestion.findAll({
      where: { assessmentResultId: id },
      include: [
        {
          model: Question,
          as: "question",
          attributes: ["id", "categoryId"],
          include: [
            { model: Category, as: "category", attributes: ["id", "name"] },
          ],
        },
      ],
      order: [["id", "ASC"]],
    });

    // Agrupar por categoría
    interface CatAgg { categoryId: number; categoryName: string; correct: number; incorrect: number; total: number }
    const map = new Map<number, CatAgg>()
    for (const row of detail as any[]) {
      const q = row.question
      const cat = q?.category
      const categoryId = cat?.id || 0
      const categoryName = cat?.name || 'Desconocida'
      if (!map.has(categoryId)) {
        map.set(categoryId, { categoryId, categoryName, correct: 0, incorrect: 0, total: 0 })
      }
      const agg = map.get(categoryId)!
      if (row.isCorrect) agg.correct++
      else agg.incorrect++
      agg.total++
    }
    const categories = Array.from(map.values()).sort((a,b)=>a.categoryId-b.categoryId)
    res.json({ result, detail, categories });
  } catch (e) {
    console.error("Error detalle resultado", e);
    res.status(500).json({ error: "DB error" });
  }
});

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
