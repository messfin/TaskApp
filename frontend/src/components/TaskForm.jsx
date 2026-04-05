import { useState } from 'react'

function TaskForm({ onAdd }) {
  const [text, setText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (text.trim()) {
      onAdd(text.trim())
      setText('')
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-input-row">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </div>
    </form>
  )
}

export default TaskForm
