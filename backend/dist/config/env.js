import 'dotenv/config';
export const env = {
    nodeEnv: process.env.NODE_ENV || 'development',
    port: Number(process.env.PORT || 4000),
    corsOrigin: process.env.CORS_ORIGIN || '*',
    jwtSecret: process.env.JWT_SECRET || 'dev-secret',
    db: {
        name: process.env.DB_NAME || 'courses',
        user: process.env.DB_USER || 'root',
        pass: process.env.DB_PASSWORD || process.env.DB_PASS || '',
        host: process.env.DB_HOST || 'localhost',
        port: Number(process.env.DB_PORT || 3306),
    }
};
