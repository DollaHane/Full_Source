import React from "react"
import { notFound } from "next/navigation"
import { NavBar } from "@/src/components/NavBar"
import { Button } from "@/src/components/components-ui/Button"
import Editor from "@/src/components/pagePostEdit/Editor"
import { db } from "@/src/lib/db"

interface PostPageProps {
  params: {
    postId: string
  }
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function PostPageContent({ params }: PostPageProps) {
  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
  })

  if (!post) return notFound()

  return (
    <div>
      {/* NAVBAR */}
      <NavBar />

      {/* PAGE */}
      <div className="mx-auto w-4/5 p-5">
        {/* EDITOR */}
        <Editor params={params} post={post} />

        <div className="mt-10 flex justify-end">
          <Button
            type="submit"
            className="w-20 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
            form="workflow-update-form"
          >
            Update
          </Button>
        </div>
      </div>
    </div>
  )
}
