# To-Do List Application

A modern to-do list application with React frontend, Express backend, Supabase database, and Clerk authentication.

## Tech Stack

- **Frontend**: React 18, Vite, Clerk Authentication
- **Backend**: Node.js, Express, Clerk Authentication
- **Database**: Supabase PostgreSQL
- **Authentication**: Clerk

## Project Structure

```
C:\claudproj\
├── backend/          # Express API server
├── frontend/          # React + Vite app
└── README.md
```

## Setup

### 1. Supabase Setup

1. Go to https://supabase.com and create a project
2. Run this SQL in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  user_id TEXT
);

ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can manage own tasks" ON tasks;
CREATE POLICY "Users can manage own tasks" ON tasks
FOR ALL USING (auth.uid()::TEXT = user_id) WITH CHECK (auth.uid()::TEXT = user_id);
```

### 2. Clerk Setup

1. Go to https://clerk.com and create an account
2. Create a new application (choose any name)
3. Copy your **Publishable Key** and **Secret Key** from Clerk Dashboard

### 3. Environment Variables

**Backend** (`backend/.env`):
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
FRONTEND_URL=http://localhost:5173
```

**Frontend** (`frontend/.env`):
```
VITE_API_URL=http://localhost:3001/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
```

### 4. Install Dependencies

```bash
cd backend && npm install
cd frontend && npm install
```

## Local Development

```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

## Deployment

### Backend (Render.com)

1. Create account at https://render.com
2. New → Web Service → Connect GitHub repo
3. Root Directory: `backend`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Environment Variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
   - `FRONTEND_URL` = your Vercel frontend URL

### Frontend (Vercel)

1. Import GitHub repo
2. Root Directory: `frontend`
3. Environment Variables:
   - `VITE_API_URL` = your Render backend URL + `/api`
   - `VITE_CLERK_PUBLISHABLE_KEY`
4. Deploy

## API Endpoints (Protected)

All endpoints require Clerk authentication via `Authorization: Bearer <session_token>` header.

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/tasks | Get user's tasks |
| POST | /api/tasks | Create task |
| PUT | /api/tasks/:id | Update task |
| PATCH | /api/tasks/:id/complete | Toggle complete |
| DELETE | /api/tasks/:id | Delete task |
| GET | /api/health | Health check (public) |
