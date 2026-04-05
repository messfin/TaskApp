# To-Do List Application

A modern to-do list application with React frontend and Express backend.

## Tech Stack

- **Frontend**: React 18, Vite
- **Backend**: Node.js, Express
- **Database**: Supabase PostgreSQL

## Project Structure

```
C:\claudproj\
├── backend/          # Express API server
├── frontend/         # React + Vite app
└── README.md
```

## Deployment to Vercel

### Prerequisites
- [Vercel CLI](https://vercel.com/cli) installed
- [Supabase](https://supabase.com) project created

### Step 1: Set up Supabase

1. Go to https://supabase.com and create a project
2. Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all" ON tasks;
CREATE POLICY "Allow all" ON tasks FOR ALL USING (true) WITH CHECK (true);
```

3. Get your Supabase URL and anon key from Settings → API

### Step 2: Deploy Backend

The backend needs to be deployed separately. Options:

**Option A: Render.com (Recommended - Free tier)**
1. Create account at https://render.com
2. Connect your GitHub repo or upload directly
3. Create Web Service:
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`
4. Add environment variables:
   - `SUPABASE_URL` = your Supabase URL
   - `SUPABASE_ANON_KEY` = your Supabase anon key

**Option B: Railway.app**
1. Create account at https://railway.app
2. New Project → Deploy from GitHub
3. Add environment variables in settings

**Option C: Fly.io**
1. Install Fly CLI
2. `fly launch` in backend folder
3. `fly secrets set SUPABASE_URL=... SUPABASE_ANON_KEY=...`
4. `fly deploy`

### Step 3: Deploy Frontend to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com
3. Import project from GitHub
4. Set Root Directory: `frontend`
5. Add environment variable:
   - `VITE_API_URL` = your backend URL (e.g., `https://your-backend.railway.app/api`)
6. Deploy!

### Local Development

```bash
# Backend
cd backend
npm install
npm start  # Runs on http://localhost:3001

# Frontend
cd frontend
npm install
npm run dev  # Runs on http://localhost:5173
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get all tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/complete | Toggle complete |
| DELETE | /api/tasks/:id | Delete task |
