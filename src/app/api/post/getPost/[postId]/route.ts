import { db } from '@/src/lib/db'
import { notFound } from 'next/navigation'

export async function GET(req: Request, context: any) {
  try {

    const postId = context.params.postId
    console.log('postId', postId)

    if (!postId) {
      return new Response('Post ID does not exist', {status: 401})
    }

    const post = await db.post.findFirst({
      where: {
        id: postId,
      },
    })
    
    if (!post) return notFound()

    console.log('post from server:', post)

    return new Response(JSON.stringify(post), {status: 200})
  } catch (error) {
    return new Response('Could not fetch page content', { status: 500 })
  }
}