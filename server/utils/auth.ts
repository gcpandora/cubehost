import { auth } from '~/server/lib/auth'
import type { H3Event } from 'h3'

type Role = 'owner' | 'admin' | 'user'
const ROLE_RANK: Record<Role, number> = { user: 0, admin: 1, owner: 2 }

export async function requireSession(event: H3Event) {
  const session = await auth.api.getSession({ headers: event.headers })
  if (!session) throw createError({ statusCode: 401, message: 'Non authentifié' })
  return session
}

export async function requireRole(event: H3Event, minRole: Role) {
  const session = await requireSession(event)
  const role = ((session.user as Record<string, unknown>).role as Role) ?? 'user'
  if (ROLE_RANK[role] < ROLE_RANK[minRole]) {
    throw createError({ statusCode: 403, message: 'Accès refusé' })
  }
  return session
}
