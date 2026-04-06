/**
 * Clerk is used only with a real publishable key and VITE_SKIP_AUTH is not "true".
 * Set VITE_SKIP_AUTH=true in .env.local to use the todo UI without signing in.
 */
function isClerkPublishableKey(value) {
  if (!value || typeof value !== 'string') return false
  const key = value.trim()
  if (!key || /^your_/i.test(key)) return false
  return key.startsWith('pk_test_') || key.startsWith('pk_live_')
}

export const clerkEnabled =
  import.meta.env.VITE_SKIP_AUTH !== 'true' &&
  isClerkPublishableKey(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY)
