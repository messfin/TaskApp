-- Create tasks table in Supabase PostgreSQL
-- Run this SQL in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  text TEXT NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy to allow all operations for authenticated users
CREATE POLICY "Allow all" ON tasks FOR ALL USING (true) WITH CHECK (true);

-- Policy for anon access (if using RLS)
CREATE POLICY "Allow anon all" ON tasks FOR ALL USING (true) WITH CHECK (true);
