import { db } from '~/server/db'
import { user } from '~/server/db/schema'

export default defineEventHandler(async () => {
  const users = await db.select({ id: user.id }).from(user).limit(1)
  return { needsSetup: users.length === 0 }
})
