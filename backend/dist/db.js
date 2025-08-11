"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
exports.testConnection = testConnection;
const promise_1 = __importDefault(require("mysql2/promise"));
const config = process.env.DATABASE_URL
    ? {
        uri: process.env.DATABASE_URL,
    }
    : {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    };
exports.pool = process.env.DATABASE_URL
    ? promise_1.default.createPool(process.env.DATABASE_URL)
    : promise_1.default.createPool(config);
async function testConnection() {
    const [rows] = await exports.pool.query("SELECT 1 as ok");
    return rows[0].ok === 1;
}
