import React from "react"
import PostFeed from "@/src/components/pageHome/PostFeed"
import { db } from "@/src/lib/db"

export default async function HowTo() {
  const posts = await db.post.findMany({
    where: {
      categorydoc: "How To",
    },
    orderBy: {
      index: "asc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })

  const workflowPosts = await db.post.findMany({
    where: {
      categorydoc: "Workflow",
    },
    orderBy: {
      index: "asc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })

  return (
    <div className="h-auto w-full">
      <div className="flex w-full">
        {/* FEED */}
        <div className="flex w-full justify-between">
          <PostFeed posts={posts} />
        </div>
      </div>
    </div>
  )
}
