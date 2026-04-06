import { UserButton } from '@clerk/clerk-react'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>My Tasks</h1>
          <p>Stay organized and get things done</p>
        </div>
        <div className="header-user">
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </header>
  )
}

export default Header
