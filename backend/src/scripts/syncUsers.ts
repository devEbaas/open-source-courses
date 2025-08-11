import 'dotenv/config'
import { sequelize, User } from '../models'

async function syncUsers() {
  try {
    await sequelize.authenticate()
    console.log('[sync:users] Conectado a DB')
    await User.sync({ alter: true })
    console.log('[sync:users] Tabla users sincronizada (create/alter)')
  } catch (e) {
    console.error('[sync:users] Error:', e)
  } finally {
    await sequelize.close()
  }
}

syncUsers()
