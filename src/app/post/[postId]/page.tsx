import CommentsSection from '@/src/components/pagePost/CommentsSection'
import EditorOutput from '@/src/components/pagePost/EditorOutput'
import PostVoteServer from '@/src/components/post-vote/PostVoteServer'
import { Button, buttonVariants } from '@/src/components/components-ui/Button'
import { db } from '@/src/lib/db'
import { redis } from '@/src/lib/redis'
import { formatTimeToNow } from '@/src/lib/utils'
import { CachedPost } from '@/src/types/redis'
import { Post, User, Vote } from '@prisma/client'
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { NavBar } from '@/src/components/NavBar'

interface PostPageProps {
  params: {
    postId: string
  }
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function PostPageContent ({ params }: PostPageProps) {

  
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost
  
  let post: (Post & { votes: Vote[]; author: User }) | null = null
  
  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }
  
  if (!post && !cachedPost) return notFound()

  
  return (
    <div>

      {/* NAVBAR */}
      <NavBar/>

      <div className='h-full w-4/5 mx-auto mt-5 mb-44 flex flex-col sm:flex-row items-center sm:items-start justify-between'>
        <Suspense fallback={<PostVoteShell />}>
  
        </Suspense>

        <div className='sm:w-0 w-full flex-1 bg-background p-2 rounded-sm'>
          
          <div className='flex justify-between w-full'>
            <h1 className='text-xl font-prompt font-semibold text-cyan-500 py-2 leading-6'>
              {post?.title ?? cachedPost.title}
            </h1>
            <a href={`/post/edit/${params.postId}`}>
            <Button type='submit' className='w-20 bg-capecod-600 hover:bg-background text-zinc-50 hover:text-primary shadow-lg rounded-full hover:border border-cyan-500' form='workflow-update-form'>
              Edit
            </Button>
            </a>
          </div>

          <p className='max-h-40 mt-5 mb-2 truncate text-xs text-capecod-500'>
            Last updated by {post?.author.username ?? cachedPost.authorUsername}{' '}
            {formatTimeToNow(new Date(post?.updatedAt ?? cachedPost.updatedAt))}
          </p>

          <EditorOutput content={post?.content ?? cachedPost.content} />

          <div className='mt-5 flex flex-col gap-2'>
            
            <PostVoteServer
              postId={post?.id ?? cachedPost.id}
              getData={async () => {
                return await db.post.findUnique({
                  where: {
                    id: params.postId,
                  },
                  include: {
                    votes: true,
                  },
                })
              }}
            />
          </div>

          <Suspense
            fallback={
              <Loader2 className='h-5 w-5 animate-spin text-capecod-300' />
            }>
            {/* @ts-expect-error Server Component */}
            <CommentsSection postId={params.postId ?? cachedPost.id} />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

function PostVoteShell() {
  return (
    <div className='flex items-center flex-col pr-6 w-20'>
      {/* upvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigUp className='h-5 w-5 text-zinc-700' />
      </div>

      {/* score */}
      <div className='text-center py-2 font-medium text-sm text-zinc-900'>
        <Loader2 className='h-3 w-3 animate-spin' />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: 'ghost' })}>
        <ArrowBigDown className='h-5 w-5 text-zinc-700' />
      </div>
    </div>
  )
}


