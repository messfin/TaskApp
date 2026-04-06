const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { clerkMiddleware, requireAuth } = require('@clerk/express')
const tasksRouter = require('./routes/tasks')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

const authDisabled = process.env.DISABLE_CLERK_AUTH === 'true'
const localUserId = process.env.LOCAL_USER_ID || 'local-dev'

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true
}))
app.use(express.json())

if (authDisabled) {
  app.use((req, res, next) => {
    req.auth = { userId: localUserId }
    next()
  })
} else {
  app.use(clerkMiddleware())
}

// Routes — require Clerk session unless local dev disables auth (pair with VITE_SKIP_AUTH on frontend)
if (authDisabled) {
  app.use('/api/tasks', tasksRouter)
} else {
  app.use('/api/tasks', requireAuth(), tasksRouter)
}

// Health check (public)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: 'supabase',
    auth: authDisabled ? 'disabled' : 'clerk',
  })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Using Supabase at: ${process.env.SUPABASE_URL}`)
  console.log(`Clerk Publishable Key: ${process.env.CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not set'}`)
})
