import React from "react"
import PostFeed from "@/src/components/pageHome/PostFeed"
import { db } from "@/src/lib/db"

export default async function Home() {
  const posts = await db.post.findMany({
    where: {
      categorydoc: "React Developement",
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
