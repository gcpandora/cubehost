export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path.startsWith('/auth') || to.path === '/setup') return

  const fetch = useRequestFetch()
  const session = await fetch('/api/auth/get-session').catch(() => null)

  if (!(session as any)?.user) {
    const status = await fetch('/api/setup/status').catch(() => ({ needsSetup: false }))
    return navigateTo((status as any)?.needsSetup ? '/setup' : '/auth/login')
  }
})
