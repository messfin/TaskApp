const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const tasksRouter = require('./routes/tasks')

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/tasks', tasksRouter)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', database: 'supabase' })
})

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`Using Supabase at: ${process.env.SUPABASE_URL}`)
})
