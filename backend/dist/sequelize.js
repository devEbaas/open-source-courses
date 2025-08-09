import { Sequelize } from 'sequelize';
const DB_NAME = process.env.DB_NAME || 'courses';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306;
export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    port: DB_PORT,
    dialect: 'mysql',
    logging: false,
    define: {
        freezeTableName: true,
    },
});
export async function testSequelizeConnection() {
    await sequelize.authenticate();
    return true;
}
export async function listCourses(limit = 100) {
    const [rows] = await sequelize.query('SELECT * FROM courses LIMIT :limit', {
        replacements: { limit },
    });
    return rows;
}
