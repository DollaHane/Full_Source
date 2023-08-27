"use client"

import Link from "next/link"
import { formatTimeToNow } from "@/src/lib/utils"
import { Post, User, Vote } from "@prisma/client"
import { MessageSquare } from "lucide-react"

type PartialVote = Pick<Vote, "type">

interface PostProps {
  post: Post & {
    author: User
    votes: Vote[]
  }
  votesAmt: number
  currentVote?: PartialVote
  commentAmt: number
}

export default function Workflow({
  post,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
  commentAmt,
}: PostProps) {
  return (
    <div className="mx-auto w-full max-w-[800px] rounded-lg border border-secondary bg-background px-5 shadow-md">
      <div className="flex justify-between py-2">
        <div className="w-0 flex-1">
          <div className="group flex flex-row gap-2">
            <h1 className="py-2 font-prompt font-semibold leading-6 text-primary group-hover:text-cyan-500 md:text-xl">
              {post.index} -
            </h1>
            <a href={`/fs/post/${post.id}`}>
              <h1 className="py-2 font-prompt font-semibold leading-6 text-primary group-hover:text-cyan-500 md:text-xl">
                {post.title}
              </h1>
            </a>
          </div>

          <div className="relative max-h-40 w-full text-clip text-xs md:text-base">
            <p>{post.description}</p>
          </div>

          <div className="mt-3 flex max-h-40 gap-2 text-xs italic text-capecod-500">
            <span>Last updated</span>
            {formatTimeToNow(new Date(post.updatedAt))}
          </div>
        </div>
      </div>

      <div className="z-20 flex flex-wrap gap-5 bg-background py-2 text-sm">
        <Link
          href={`/post/${post.id}`}
          className="flex w-fit items-center gap-2 text-capecod-500"
        >
          <MessageSquare className="h-4 w-4" /> {commentAmt} comments
        </Link>
      </div>
    </div>
  )
}
