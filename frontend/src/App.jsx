import { useState, useEffect } from 'react'
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react'
import Header from './components/Header'
import TaskForm from './components/TaskForm'
import TaskList from './components/TaskList'
import FilterBar from './components/FilterBar'
import { taskAPI } from './services/api'

function App() {
  return (
    <>
      <SignedIn>
        <AppContent />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  )
}

function AppContent() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchTasks()
  }, [])

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const fetchedTasks = await taskAPI.getAll()
      setTasks(fetchedTasks)
    } catch (err) {
      setError('Unable to connect to server. Please check if the backend is running.')
      console.error('Failed to fetch tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (text) => {
    try {
      const newTask = await taskAPI.create(text)
      setTasks(prev => [newTask, ...prev])
    } catch (err) {
      alert('Failed to add task. Please try again.')
      console.error('Failed to add task:', err)
    }
  }

  const updateTask = async (id, text) => {
    try {
      const updatedTask = await taskAPI.update(id, text)
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
    } catch (err) {
      alert('Failed to update task. Please try again.')
      console.error('Failed to update task:', err)
    }
  }

  const toggleComplete = async (id) => {
    try {
      const updatedTask = await taskAPI.toggleComplete(id)
      setTasks(prev => prev.map(t => t.id === id ? updatedTask : t))
    } catch (err) {
      alert('Failed to update task. Please try again.')
      console.error('Failed to toggle task:', err)
    }
  }

  const deleteTask = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) {
      return
    }
    try {
      await taskAPI.delete(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      alert('Failed to delete task. Please try again.')
      console.error('Failed to delete task:', err)
    }
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const activeCount = tasks.filter(t => !t.completed).length
  const completedCount = tasks.filter(t => t.completed).length

  return (
    <div className="app">
      <Header />
      <TaskForm onAdd={addTask} />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        activeCount={activeCount}
        completedCount={completedCount}
      />
      <TaskList
        tasks={filteredTasks}
        loading={loading}
        error={error}
        onToggle={toggleComplete}
        onUpdate={updateTask}
        onDelete={deleteTask}
      />
    </div>
  )
}

export default App
