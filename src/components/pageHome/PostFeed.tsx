"use client"

import { ExtendedPost } from "@/src/types/db"
import { useSession } from "next-auth/react"

import PostComponent from "./PostComponent"

interface PostFeedProps {
  posts: ExtendedPost[]
}

export default function WorkflowFeed({ posts }: PostFeedProps) {
  const { data: session } = useSession()

  return (
    <div className="z-20 mx-auto w-11/12 min-w-[280px] overflow-hidden md:w-9/12">
      <ul className="mx-5 mb-44 mt-16 flex h-full flex-col space-y-5">
        {posts.map((post) => {
          const votesAmt = post.votes.reduce((acc, vote) => {
            if (vote.type === "UP") return acc + 1
            if (vote.type === "DOWN") return acc - 1
            return acc
          }, 0)

          const currentVote = post.votes.find(
            (vote) => vote.userId === session?.user.id
          )

          return (
            <PostComponent
              key={post.id}
              post={post}
              commentAmt={post.comments.length}
              votesAmt={votesAmt}
              currentVote={currentVote}
            />
          )
        })}
      </ul>
    </div>
  )
}
