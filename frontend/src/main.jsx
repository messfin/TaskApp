import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import { clerkEnabled } from './clerkEnabled.js'
import './App.css'

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

const app = <App />

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {clerkEnabled ? (
      <ClerkProvider
        publishableKey={clerkPubKey}
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
      >
        {app}
      </ClerkProvider>
    ) : (
      app
    )}
  </React.StrictMode>,
)
