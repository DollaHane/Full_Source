import React from "react"
import { NavBar } from "@/src/components/NavBar"
import { SideNav } from "@/src/components/SideNav"
import NpmFeed from "@/src/components/pageHome/NpmFeed"
import WorkflowFeed from "@/src/components/pageHome/WorkflowFeed"
import { Post } from "@prisma/client"
import { db } from "@/src/lib/db"

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
        <div className="w-2/12">
          {/* @ts-expect-error Server Component */}
          <SideNav workflowPosts={workflowPosts} />
        </div>

        {/* FEED */}
        <div className="flex w-full justify-between">
          <div className="w-8/12">
            <WorkflowFeed posts={workflowPosts} />
          </div>
          <div className="w-4/12 border-l border-secondary">
            <NpmFeed posts={npmPosts} />
          </div>
        </div>
      </div>
    </div>
  )
}
