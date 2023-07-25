import { getAuthSession } from '@/src/lib/auth'
import { db } from '@/src/lib/db'
import { AuthChangeValidator } from '@/src/lib/validators/admin'
import { z } from 'zod'

export async function PATCH(req: Request) {
  try {
    const session = await getAuthSession()

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }
    

    const body = await req.json()
    const { admin } = AuthChangeValidator.parse(body)

    // update username
    await db.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        username: name,
      },
    })

    return new Response('OK')
  } catch (error) {
    (error)

    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }

    return new Response(
      'Could not update username at this time. Please try later',
      { status: 500 }
    )
  }
}
