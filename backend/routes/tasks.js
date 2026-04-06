const express = require('express')
const router = express.Router()
const supabase = require('../supabase/client')

// GET /api/tasks - Get tasks for current user only
router.get('/', async (req, res) => {
  try {
    const userId = req.auth.userId

    const { data: tasks, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    res.json({ tasks })
  } catch (error) {
    console.error('Error fetching tasks:', error.message, error.details)
    res.status(500).json({ error: error.message || 'Failed to fetch tasks' })
  }
})

// POST /api/tasks - Create a new task for current user
router.post('/', async (req, res) => {
  try {
    const userId = req.auth.userId
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Task text is required' })
    }

    const { data: task, error } = await supabase
      .from('tasks')
      .insert([{
        text: text.trim(),
        user_id: userId
      }])
      .select()
      .single()

    if (error) throw error
    res.status(201).json({ task })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ error: 'Failed to create task' })
  }
})

// PUT /api/tasks/:id - Update task text (only if owned by user)
router.put('/:id', async (req, res) => {
  try {
    const userId = req.auth.userId
    const { id } = req.params
    const { text } = req.body

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'Task text is required' })
    }

    // Only update if task belongs to user
    const { data: task, error } = await supabase
      .from('tasks')
      .update({ text: text.trim() })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    if (!task) {
      return res.status(404).json({ error: 'Task not found' })
    }

    res.json({ task })
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ error: 'Failed to update task' })
  }
})

// PATCH /api/tasks/:id/complete - Toggle task completion
router.patch('/:id/complete', async (req, res) => {
  try {
    const userId = req.auth.userId
    const { id } = req.params

    // First get the current task (only if owned by user)
    const { data: currentTask, error: fetchError } = await supabase
      .from('tasks')
      .select('completed')
      .eq('id', id)
      .eq('user_id', userId)
      .single()

    if (fetchError || !currentTask) {
      return res.status(404).json({ error: 'Task not found' })
    }

    // Toggle the completed status
    const { data: task, error } = await supabase
      .from('tasks')
      .update({ completed: !currentTask.completed })
      .eq('id', id)
      .eq('user_id', userId)
      .select()
      .single()

    if (error) throw error
    res.json({ task })
  } catch (error) {
    console.error('Error toggling task:', error)
    res.status(500).json({ error: 'Failed to toggle task' })
  }
})

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const userId = req.auth.userId
    const { id } = req.params

    // Only delete if task belongs to user
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) throw error
    res.json({ success: true })
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ error: 'Failed to delete task' })
  }
})

module.exports = router
