import { Sequelize } from 'sequelize'

export interface Course {
  id: number
  title?: string
  name?: string
  description?: string
  [key: string]: any
}

const DB_NAME = process.env.DB_NAME || ''
const DB_USER = process.env.DB_USER || ''
const DB_PASSWORD = process.env.DB_PASSWORD || ''
const DB_HOST = process.env.DB_HOST || ''
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306

let sequelizeInstance: Sequelize | null = null

function createSequelize(): Sequelize {
  if (process.env.DATABASE_URL) {
    return new Sequelize(process.env.DATABASE_URL, {
      dialect: 'mysql',
      logging: false,
      define: { freezeTableName: true },
    })
  }
  if (!DB_NAME || !DB_USER || !DB_HOST) {
    console.warn('[backend] Variables DB incompletas: se pospone conexión hasta que estén disponibles')
  }
  return new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
    define: { freezeTableName: true },
  })
}

export const sequelize: Sequelize = ((): Sequelize => {
  sequelizeInstance = createSequelize()
  return sequelizeInstance
})()

export async function testSequelizeConnection(): Promise<boolean> {
  try {
    await sequelize.authenticate()
    return true
  } catch (err: any) {
    console.error('[backend] Fallo autenticando con DB:', err?.message || err)
    throw err
  }
}

export async function listCourses(limit = 100): Promise<Course[]> {
  const [rows] = await sequelize.query('SELECT * FROM courses LIMIT :limit', {
    replacements: { limit },
  })
  return rows as Course[]
}
