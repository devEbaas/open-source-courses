"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const sequelize_1 = require("./sequelize");
const auth_1 = __importDefault(require("./routes/auth"));
const course_routes_1 = __importDefault(require("./routes/course.routes"));
const assessment_routes_1 = __importDefault(require("./routes/assessment.routes"));
const errorHandler_1 = require("./middleware/errorHandler");
const app = (0, express_1.default)();
let dbReady = false;
const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN;
app.use((0, cors_1.default)({
    origin: CORS_ORIGIN,
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.get("/ping", (_req, res) => {
    return res.status(200).json({ message: "pong", db: dbReady ? 'ok' : 'pending' });
});
app.use("/auth", auth_1.default);
app.use('/courses', course_routes_1.default);
app.use('/assessments', assessment_routes_1.default);
app.use(errorHandler_1.errorHandler);
async function start() {
    app.listen(PORT, () => {
        console.log(`[backend] listening on http://localhost:${PORT}`);
        connectToDatabase();
    });
}
async function connectToDatabase() {
    try {
        await (0, sequelize_1.testSequelizeConnection)();
        dbReady = true;
        console.log("[backend] DB conectado (Sequelize)");
    }
    catch (e) {
        dbReady = false;
        console.error("[backend] Error conectando a la DB, reintentando en 5s");
        setTimeout(connectToDatabase, 5000);
    }
}
start();
