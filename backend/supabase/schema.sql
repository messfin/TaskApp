-- Add user_id column to tasks table for Clerk authentication
-- Run this in Supabase SQL Editor

ALTER TABLE tasks ADD COLUMN IF NOT EXISTS user_id TEXT;

-- Create index for faster user-based queries
CREATE INDEX IF NOT EXISTS idx_tasks_user_id ON tasks(user_id);

-- Enable RLS for user-based access control
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Drop existing policies and create new ones for user-based access
DROP POLICY IF EXISTS "Allow all" ON tasks;
DROP POLICY IF EXISTS "Users can manage own tasks" ON tasks;

-- Policy: Users can only see and manage their own tasks
CREATE POLICY "Users can manage own tasks" ON tasks
FOR ALL
USING (auth.uid()::TEXT = user_id)
WITH CHECK (auth.uid()::TEXT = user_id);
