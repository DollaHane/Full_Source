import React from "react"
import PostFeed from "@/src/components/pageHome/PostFeed"
import { db } from "@/src/lib/db"

export default async function Lessons() {
  const posts = await db.post.findMany({
    where: {
      categorydoc: "Lessons Learnt",
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
      <PostFeed posts={posts} />
    </div>
  )
}
