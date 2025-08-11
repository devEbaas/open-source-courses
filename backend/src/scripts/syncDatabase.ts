import 'dotenv/config';
import { sequelize } from '../models';

async function main() {
  try {
    const force = process.env.DB_FORCE_SYNC === 'true';
    const alter = process.env.DB_ALTER_SYNC === 'true';
    console.log(`[db:sync] Iniciando sync (force=${force} alter=${alter})`);
    await sequelize.sync({ force, alter });
    console.log('[db:sync] Tablas sincronizadas');
  } catch (err) {
    console.error('[db:sync] Error:', err);
    process.exit(1);
  } finally {
    await sequelize.close();
  }
}

main();
