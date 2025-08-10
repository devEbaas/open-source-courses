import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { testSequelizeConnection, listCourses, Course } from './sequelize'
import { sequelize as orm, Question, Answer, Category } from './models'
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

app.get('/questions', async (_req: Request, res: Response) => {
  const PER_CATEGORY = 5
  try {
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
          where: { categoryId: cat.id },
          order: (orm as any).random(),
          limit: PER_CATEGORY,
          include: [
            { model: Answer, as: 'answers', attributes: ['id', 'text', 'isCorrect'] },
            { model: Category, as: 'category', attributes: ['id', 'name'] },
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
