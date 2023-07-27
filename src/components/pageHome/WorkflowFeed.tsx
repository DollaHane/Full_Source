'use client'
import { ExtendedPost } from '@/src/types/db'
import WorkflowComponent from './WorkflowComponent'
import { useSession } from 'next-auth/react'

interface PostFeedProps {
  posts: ExtendedPost[]
}

export default function WorkflowFeed ({ posts }: PostFeedProps) {

  const { data: session } = useSession()

  return (
    <ul className='flex flex-col col-span-2 space-y-10 mt-10 mb-44'>
      {posts.map((post) => {
        const votesAmt = post.votes.reduce((acc, vote) => {
          if (vote.type === 'UP') return acc + 1
          if (vote.type === 'DOWN') return acc - 1
          return acc
        }, 0)

        const currentVote = post.votes.find(
          (vote) => vote.userId === session?.user.id
        )

        return (
          <WorkflowComponent
            key={post.id}
            post={post}
            commentAmt={post.comments.length}
            votesAmt={votesAmt}
            currentVote={currentVote}
          />
        )
        
      })}
    </ul>
  )
}

