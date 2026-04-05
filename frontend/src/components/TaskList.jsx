import TaskItem from './TaskItem'

function TaskList({ tasks, loading, error, onToggle, onUpdate, onDelete }) {
  if (loading) {
    return <div className="empty-state">Loading tasks...</div>
  }

  if (error) {
    return <div className="empty-state">{error}</div>
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📝</div>
        <p>No tasks yet. Add one above!</p>
      </div>
    )
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList
