import 'dotenv/config'
import express, { Request, Response } from 'express'
import cors from 'cors'
import { testSequelizeConnection, listCourses, Course } from './sequelize'
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

// app.get('/courses', async (_req: Request, res: Response) => {
//   try {
//     const rows: Course[] = await listCourses(100)
//     res.json(rows)
//   } catch (e) {
//     console.error('Error fetching courses', e)
//     res.status(500).json({ error: 'DB error' })
//   }
// })

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
