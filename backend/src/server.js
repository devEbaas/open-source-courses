import "dotenv/config"
import express from "express"
import cors from "cors"

const app = express()

const PORT = process.env.PORT || 4000
const CORS_ORIGIN = process.env.CORS_ORIGIN || "*"

app.use(
  cors({
    origin: CORS_ORIGIN,
  }),
)

app.use(express.json())

app.get("/ping", (_req, res) => {
  res.json({ message: "pong" })
})

app.listen(PORT, () => {
  console.log(`[backend] listening on http://localhost:${PORT}`)
})
