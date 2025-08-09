import mysql from 'mysql2/promise'

export const pool = mysql.createPool({
  host: process.env.DB_HOST as string,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER as string,
  password: process.env.DB_PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export async function testConnection() {
  const [rows]: any = await pool.query('SELECT 1 as ok')
  return rows[0].ok === 1
}
