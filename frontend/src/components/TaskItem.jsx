import { useState } from 'react'

function TaskItem({ task, onToggle, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editText, setEditText] = useState(task.text)

  const handleSave = () => {
    if (editText.trim() && editText !== task.text) {
      onUpdate(task.id, editText.trim())
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditText(task.text)
    setIsEditing(false)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  if (isEditing) {
    return (
      <div className="task-item">
        <div
          className="task-checkbox"
          style={{ visibility: 'hidden' }}
        />
        <div className="task-content">
          <input
            type="text"
            className="task-title-input"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <button className="btn btn-save" onClick={handleSave}>Save</button>
        <button className="btn btn-cancel" onClick={handleCancel}>Cancel</button>
      </div>
    )
  }

  return (
    <div className="task-item">
      <div
        className={`task-checkbox ${task.completed ? 'checked' : ''}`}
        onClick={() => onToggle(task.id)}
      />
      <div className="task-content">
        <span className={`task-title ${task.completed ? 'completed' : ''}`}>
          {task.text}
        </span>
      </div>
      <div className="task-actions">
        <button className="btn btn-edit" onClick={() => setIsEditing(true)}>
          Edit
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
}

export default TaskItem
