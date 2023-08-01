import React from "react"
import { NavBar } from "@/src/components/NavBar"
import { SideNav } from "@/src/components/SideNav"
import NpmFeed from "@/src/components/pageHome/NpmFeed"
import WorkflowFeed from "@/src/components/pageHome/WorkflowFeed"
import { db } from "@/src/lib/db"
import { Post } from "@prisma/client"

export default async function Home() {
  const posts = await db.post.findMany({
    orderBy: {
      index: "asc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })

  const formatWorkflowPosts = (posts: Post) => {
    return posts?.categorydoc === "Workflow"
  }

  const formatNpmPosts = (posts: Post) => {
    return posts?.type === "NPM Link"
  }

  const workflowPosts = posts.filter(formatWorkflowPosts)
  const npmPosts = posts.filter(formatNpmPosts)

  return (
    <div className="h-auto w-full">
      {/* NAVBAR */}
      {/* @ts-expect-error Server Component */}
      <NavBar />

      <div className="flex w-full">
        {/* SIDENAV */}
        <div>
          {/* @ts-expect-error Server Component */}
          <SideNav workflowPosts={workflowPosts} />
        </div>

        {/* FEED */}
        <div className="flex w-full justify-between">
          <WorkflowFeed posts={workflowPosts} />
          <div className="h-screen w-[30%] min-w-[200px]"></div>
          <NpmFeed posts={npmPosts} />
        </div>
      </div>
    </div>
  )
}
