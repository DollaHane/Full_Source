'use client'
import React from 'react'
import { Post } from '@prisma/client'
import { Button } from '../components-ui/Button'
import { Copy } from 'lucide-react'

interface PostProps {
  post: Post
}

export default function NpmComponent({ post }: PostProps) {

  const text = post.description

  return (
    <div>
      <a href={`/post/${post.id}`}>
        <h1 className='text-rose-600 text-sm'>
          {post.title}
        </h1>
      </a>
      <pre className='w-full flex relative bg-capecod-600 rounded p-2 shadow-sm'>
      <code className='text-capecod-50 text-xs truncate'>{post.description}</code>
      <Button
        className='bg-capecod-600 absolute hover:bg-capecod-400 h-8 top-0 right-0'
        onClick={() => {
          navigator.clipboard.writeText(text);}}
        size='sm'
        variant='ghost'>
        <Copy className=" w-3 h-3 text-capecod-50"/>
      </Button>
    </pre>
    </div>
  )
}
