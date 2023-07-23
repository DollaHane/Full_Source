import { getAuthSession } from '@/src/lib/auth'
import { db } from '@/src/lib/db'
import { PostValidator } from '@/src/lib/validators/post'
import { z } from 'zod'

export async function PATCH(req: Request, context: any) {
  try {
    const postId = context.params.postId
    console.log('postId:', postId)
    const body = await req.json()
    console.log("Post Body", body)

    const { type, category, index, title, description, content } = PostValidator.parse(body)

    const session = await getAuthSession()
    console.log(session)

    if (!session?.user) {
      return new Response('Unauthorized', { status: 401 })
    }

    const post = await db.post.update({
      where: {
        id: postId
      },
      data: {
        type,
        category,
        index,
        title,
        description,
        content,
      },
    })

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(error.message, { status: 400 })
    }
    
    return new Response('Could not update the post at this time. Please try later', { status: 500 })
  }
}
