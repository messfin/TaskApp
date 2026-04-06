import { UserButton } from '@clerk/clerk-react'
import { clerkEnabled } from '../clerkEnabled.js'

function Header() {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>My Tasks</h1>
          <p>Stay organized and get things done</p>
        </div>
        {clerkEnabled ? (
          <div className="header-user">
            <UserButton afterSignOutUrl="/" />
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Header
