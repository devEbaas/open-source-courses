import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { testSequelizeConnection, listCourses } from './sequelize'
import { sequelize as orm, Question, Answer, Category, Assessment, Course } from './models'
import questionRoutes from './routes/questions'

const app = express()

const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*'

app.use(
  cors({
    origin: CORS_ORIGIN,
  })
)

app.use(express.json())

app.get('/ping', (_req: Request, res: Response) => {
  res.json({ message: 'pong' })
})

app.use('/api', questionRoutes);

app.get('/questions', async (req: Request, res: Response) => {
  const PER_CATEGORY = 5
  try {
    const assessmentId = req.query.assessmentId ? Number(req.query.assessmentId) : undefined
    if (!assessmentId || Number.isNaN(assessmentId)) {
      return res.status(400).json({ error: 'assessmentId requerido ?assessmentId=ID' })
    }
    const categories = await Category.findAll()
    if (categories.length < 2) {
      return res.status(400).json({ error: 'Se requieren al menos 2 categorías' })
    }
    let picked = categories
    if (categories.length > 2) {
      const shuffled = [...categories]
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
      }
      picked = shuffled.slice(0, 2)
    }
    const results = await Promise.all(
      picked.map(async (cat) => {
        const qs = await Question.findAll({
          where: { categoryId: cat.id, assessmentId },
          order: (orm as any).random(),
          limit: PER_CATEGORY,
          include: [
            { model: Answer, as: 'answers', attributes: ['id', 'text', 'isCorrect'] },
            { model: Category, as: 'category', attributes: ['id', 'name'] },
            { model: Assessment, as: 'assessment', attributes: ['id','title'] },
          ],
        })
        if (qs.length < PER_CATEGORY) {
          console.warn(`Categoría ${cat.id} solo tiene ${qs.length} preguntas (< ${PER_CATEGORY})`)
        }
        return qs
      })
    )
    const merged = results.flat()
    for (let i = merged.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[merged[i], merged[j]] = [merged[j], merged[i]]
    }
    res.json(merged.slice(0, PER_CATEGORY * 2))
  } catch (e) {
    console.error('Error fetching questions', e)
    res.status(500).json({ error: 'DB error' })
  }
})

app.get('/courses', async (_req: Request, res: Response) => {
  try {
    const courses = await Course.findAll({
      attributes: ['id', 'name', 'description'],
      include: [
        { model: Assessment, as: 'assessment', attributes: ['id'] },
      ],
    })
    res.json(courses)
  } catch (e) {
    console.error('Error listando cursos', e)
    res.status(500).json({ error: 'DB error' })
  }
})

app.get('/courses/:id', async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id)
    if (Number.isNaN(id)) return res.status(400).json({ error: 'id inválido' })
    const course = await Course.findByPk(id, {
      attributes: ['id', 'name', 'description', 'assessmentId'],
      include: [
        { model: Assessment, as: 'assessment', attributes: ['id', 'title', 'description'] },
      ],
    })
    if (!course) return res.status(404).json({ error: 'No encontrado' })
    res.json(course)
  } catch (e) {
    console.error('Error obteniendo curso', e)
    res.status(500).json({ error: 'DB error' })
  }
})

// Preguntas por assessment via ruta RESTful
app.get('/assessments/:id/questions', async (req: Request, res: Response) => {
  const PER_CATEGORY = 5
  try {
    const assessmentId = Number(req.params.id)
    if (Number.isNaN(assessmentId)) return res.status(400).json({ error: 'assessmentId inválido' })

    // Traer todas las preguntas de ese assessment
    const allQuestions = await Question.findAll({
      where: { assessmentId },
      include: [
        { model: Answer, as: 'answers', attributes: ['id', 'text', 'isCorrect'] },
        { model: Category, as: 'category', attributes: ['id', 'name'] },
        { model: Assessment, as: 'assessment', attributes: ['id','title'] },
      ],
    })
    if (!allQuestions.length) return res.json([])

    // Agrupar por categoría
    const byCategory = new Map<number, typeof allQuestions>()
    for (const q of allQuestions) {
      const cid = (q as any).categoryId as number
      if (!byCategory.has(cid)) byCategory.set(cid, [] as any)
      byCategory.get(cid)!.push(q)
    }
    // Seleccionar exactamente dos categorías (idealmente Frontend/Backend)
    const categoryEntries = Array.from(byCategory.entries())
    // Ordenar para estabilidad por id
    categoryEntries.sort((a,b)=>a[0]-b[0])
    const picked = categoryEntries.slice(0,2)
    // Shuffle helper
    function shuffle<T>(arr: T[]) { for (let i=arr.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [arr[i],arr[j]]=[arr[j],arr[i]] } }
    const final: any[] = []
    for (const [, arr] of picked) {
      shuffle(arr)
      final.push(...arr.slice(0, PER_CATEGORY))
    }
    shuffle(final)
    res.json(final.slice(0, PER_CATEGORY*2))
  } catch (e) {
    console.error('Error obteniendo preguntas por assessment', e)
    res.status(500).json({ error: 'DB error' })
  }
})

async function start(): Promise<void> {
  try {
    await testSequelizeConnection()
    console.log('[backend] DB conectado (Sequelize)')
    app.listen(PORT, () => {
      console.log(`[backend] listening on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error('[backend] No se pudo conectar a la DB', e)
    process.exit(1)
  }
}

start()
