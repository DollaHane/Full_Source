"use client"

import React from "react"
import { Post } from "@prisma/client"
import { Copy } from "lucide-react"

import { Button } from "../components-ui/Button"

interface PostProps {
  post: Post
}

export default function NpmComponent({ post }: PostProps) {
  const text = post.description

  return (
    <div>
      <a href={`/post/${post.id}`}>
        <h1 className="text-sm text-rose-600">{post.title}</h1>
      </a>
      <pre className="relative flex w-full rounded bg-capecod-600 p-2 shadow-sm">
        <code className="truncate text-xs text-capecod-50">
          {post.description}
        </code>
        <Button
          className="absolute right-0 top-0 h-8 bg-capecod-600 hover:bg-capecod-400"
          onClick={() => {
            navigator.clipboard.writeText(text)
          }}
          size="sm"
          variant="ghost"
        >
          <Copy className=" h-3 w-3 text-capecod-50" />
        </Button>
      </pre>
    </div>
  )
}
