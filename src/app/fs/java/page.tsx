import React from "react"
import PostFeed from "@/src/components/pageHome/PostFeed"
import { db } from "@/src/lib/db"

export default async function Java() {
  const posts = await db.post.findMany({
    where: {
      categorydoc: "Java Maven",
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
    <div className="w-full">
      <PostFeed posts={posts} />
    </div>
  )
}
