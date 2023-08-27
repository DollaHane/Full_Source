import React from "react"
import { NavBar } from "@/src/components/NavBar"
import { SideNav } from "@/src/components/SideNav"
import NpmFeed from "@/src/components/pageHome/NpmFeed"
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
      <div className="flex w-full">
        {/* FEED */}
        <div className="flex w-full justify-between">
          <PostFeed posts={posts} />
          <div className="h-screen w-[30%] min-w-[200px]"></div>
          {/* @ts-expect-error Server Component */}
          <NpmFeed />
        </div>
      </div>
    </div>
  )
}
