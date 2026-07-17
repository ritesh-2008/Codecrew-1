import express from "express"
import { createServer } from "node:http"
import { Server } from "socket.io";
import dotenv from "dotenv"
import cors from "cors"
import helmet from "helmet"
import { apiLimiter } from "./config/limiter.js"
import path from "path"
import { fileURLToPath } from "url"
import registerSocketHandlers from "./socket/index.js";

// Load .env from backend directory
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.join(__dirname, ".env") })

console.log("[Server] JWT_SECRET loaded:", process.env.JWT_SECRET ? "✅ Yes" : "❌ No")

import connectToDatabase from "./config/db.js"


const app = express() // my express app
const server = createServer(app)  // create an HTTP server using the Express app
const port = process.env.PORT || 3000
const host = process.env.HOST || "0.0.0.0"

const defaultOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:5175"
]

const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
  : defaultOrigins

// CORS options
const corsOptions = {
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}
// Create a new Socket.IO server and attach it to the HTTP server
const io = new Server(server, {
  cors: {
   origin:["http://localhost:5173"],
        credentials:true
  }
});
console.log("registering socket handlers...")
registerSocketHandlers(io)  // Register socket handlers

// Apply middleware BEFORE routes
app.use(cors(corsOptions))
app.use(express.json())
app.use(helmet())  // helmet helps secure Express apps by setting various HTTP headers

// importing router 
const authRouter = await import("./router/auth.router.js")
const projectRouter = await import("./router/project.router.js")
const userRouter = await import("./router/user.router.js")
const authMiddleware = (await import("./middleware/auth.js")).default

// applying rate limiter and routes
app.use("/api", apiLimiter) // Apply general rate limiter to all API routes
app.use("/api/auth", authRouter.default)
app.use("/api", projectRouter.default)
app.use("/api", userRouter.default)

connectToDatabase() // connect to mongodb

// Health check endpoint
app.get('/health', (req, res) => {
  res.setHeader("express", "CodeCrew Backend")
  res.json({ status: 'ok', message: 'CodeCrew Backend is running' })
});

// Dev debug: echo Authorization header (no auth required)
app.get('/api/debug/echo', (req, res) => {
  res.json({ authorization: req.headers.authorization || null })
})

// Dev debug: verify token using auth middleware and return decoded payload
app.get('/api/debug/auth', authMiddleware, (req, res) => {
  res.json({ success: true, user: req.user, authorization: req.headers.authorization || null })
})

// Add error handler at the end:
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ success: false, message: "Internal Server Error" })
})

server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
})