
import React from 'react'
import { db } from '@/src/lib/db'
import { notFound } from 'next/navigation'
import Editor from '@/src/components/pagePostEdit/Editor'
import { NavBar } from '@/src/components/NavBar'
import { Button } from '@/src/components/components-ui/Button'

interface PostPageProps {
  params: {
    postId: string
  },
}

export const dynamic = 'force-dynamic'
export const fetchCache = 'force-no-store'

export default async function PostPageContent ({ params }: PostPageProps) {

  const post = await db.post.findFirst({
    where: {
      id: params.postId,
    },
  })
  
  if (!post) return notFound()

  return (
    <div>
      {/* NAVBAR */}
      <NavBar/>

    {/* PAGE */}
    <div className='p-10'>
      {/* EDITOR */}
      <Editor 
        params={params}
        post={post}
      />

      <div className='w-full flex justify-start mt-10'>
        <Button type='submit' className='w-20 bg-capecod-600 hover:bg-background text-zinc-50 hover:text-primary shadow-lg rounded-full hover:border border-cyan-500' form='workflow-update-form'>
          Update
        </Button>
      </div>
    </div>

    </div>
  )
}
