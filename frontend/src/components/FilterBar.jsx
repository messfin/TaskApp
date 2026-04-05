function FilterBar({ filter, setFilter, activeCount, completedCount }) {
  return (
    <div className="filter-bar">
      <div className="filter-buttons">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button
          className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
          onClick={() => setFilter('active')}
        >
          Active
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>
      <div className="filter-stats">
        {activeCount} active · {completedCount} done
      </div>
    </div>
  )
}

export default FilterBar
