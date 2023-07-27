'use client'
import { formatTimeToNow } from '@/src/lib/utils'
import { Post, User, Vote } from '@prisma/client'
import { MessageSquare } from 'lucide-react'
import Link from 'next/link'

type PartialVote = Pick<Vote, 'type'>

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  currentVote?: PartialVote
  commentAmt: number
}

export default function Workflow({ post, votesAmt: _votesAmt, currentVote: _currentVote, commentAmt }: PostProps) {

  return (
    <div className='w-full mx-auto px-5 rounded-lg bg-background border border-secondary shadow-md'
    
    >
      
      <div className='flex justify-between py-2'>
        <div className='w-0 flex-1'>

          <div className=' flex flex-row gap-2'>
            <h1 className='text-xl font-prompt font-semibold text-cyan-500 py-2 leading-6'>
              {post.index} -
            </h1>
            <a href={`/post/${post.id}`}>
              <h1 className='text-xl font-prompt font-semibold text-cyan-500 py-2 leading-6'>
                {post.title}
              </h1>
            </a>
          </div>

          <div className='relative text-sm max-h-40 w-full overflow-clip'>
            <p>
              {post.description}
            </p>
          </div>

          <div className='flex max-h-40 gap-2 mt-3 text-xs text-capecod-500 italic'>
            <span>Last updated</span>
            {formatTimeToNow(new Date(post.updatedAt))}
          </div>

        </div>
      </div>

      <div className='bg-background flex flex-wrap gap-5 z-20 text-sm py-2'>
        <Link
          href={`/post/${post.id}`}
          className='w-fit flex items-center gap-2 text-capecod-500'>
          <MessageSquare className='h-4 w-4' /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}