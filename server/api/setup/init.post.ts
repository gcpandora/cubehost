import { eq } from 'drizzle-orm'
import { auth } from '~/server/lib/auth'
import { db } from '~/server/db'
import { user } from '~/server/db/schema'

export default defineEventHandler(async (event) => {
  const existing = await db.select({ id: user.id }).from(user).limit(1)
  if (existing.length > 0) {
    throw createError({ statusCode: 403, message: 'Setup déjà effectué' })
  }

  const body = await readBody<{ name: string; email: string; password: string }>(event)

  const result = await auth.api.signUpEmail({ body })

  await db.update(user)
    .set({ role: 'owner', updatedAt: new Date() })
    .where(eq(user.id, result.user.id))

  return { ok: true }
})
