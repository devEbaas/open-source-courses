import request from 'supertest'
import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'

// Pequeño factory para montar solo lo necesario del server original
function createApp() {
  const app = express()
  app.use(cors())
  app.use(cookieParser())
  app.use(express.json())
  app.get('/ping', (_req,res)=>res.json({ message: 'pong' }))
  return app
}

describe('GET /ping', () => {
  it('responde pong', async () => {
    const app = createApp()
    const res = await request(app).get('/ping')
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'pong' })
  })
})
