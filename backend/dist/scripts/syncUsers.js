"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const models_1 = require("../models");
async function syncUsers() {
    try {
        await models_1.sequelize.authenticate();
        console.log('[sync:users] Conectado a DB');
        await models_1.User.sync({ alter: true });
        console.log('[sync:users] Tabla users sincronizada (create/alter)');
    }
    catch (e) {
        console.error('[sync:users] Error:', e);
    }
    finally {
        await models_1.sequelize.close();
    }
}
syncUsers();
