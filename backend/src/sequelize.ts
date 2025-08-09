import { Sequelize } from 'sequelize'

export interface Course {
  id: number
  title?: string
  name?: string
  description?: string
  [key: string]: any
}

const DB_NAME = process.env.DB_NAME as string
const DB_USER = process.env.DB_USER as string
const DB_PASSWORD = process.env.DB_PASSWORD as string
const DB_HOST = process.env.DB_HOST as string
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
  },
})

export async function testSequelizeConnection(): Promise<boolean> {
  await sequelize.authenticate()
  return true
}

export async function listCourses(limit = 100): Promise<Course[]> {
  const [rows] = await sequelize.query('SELECT * FROM courses LIMIT :limit', {
    replacements: { limit },
  })
  return rows as Course[]
}
