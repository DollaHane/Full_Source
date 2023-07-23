import { getAuthSession } from '@/src/lib/auth'
import { db } from '@/src/lib/db'
import { PostValidator } from '@/src/lib/validators/post'
import { z } from 'zod'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    console.log("Post Body", body)

    const { type, category, index, title, description, content } = PostValidator.parse(body)

    const session = await getAuthSession()
    console.log(session)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const post = await db.post.create({
      data: {
        type,
        category,
        index,
        title,
        description,
        content,
        authorId: session.user.id,
      },
    })

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    
    return new Response('Could not create a post at this time. Please try later', { status: 500 })
  }
}
