import { db } from '@/src/lib/db'
import { Post } from '@prisma/client';
import WorkflowFeed from './WorkflowFeed'
import NpmFeed from './NpmFeed';

export default async function GeneralFeed() {

  const posts = await db.post.findMany({
    orderBy: {
      index: 'asc',
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })

  console.log('Posts:', posts)

  const formatWorkflowPosts = (posts: Post) => {
    return posts?.categorydoc === 'Workflow'
  };

  const formatNpmPosts = (posts: Post) => {
    return posts?.type === 'NPM Link'
  };

  const workflowPosts = posts.filter(formatWorkflowPosts)
  const npmPosts = posts.filter(formatNpmPosts)
  console.log('npmPosts:', npmPosts)


  return (
    <div className='flex flex-row justify-between'>
      <div className='w-2/12 h-[100vh] ml-5 border-r border-secondary'>
        Side Nav
      </div>
      <div className='w-6/12'>
        <WorkflowFeed posts={workflowPosts} />
      </div>
      <div className='w-3/12 border-l border-secondary'>
        <NpmFeed posts={npmPosts}/>
      </div>
    </div>
    ) 
}


