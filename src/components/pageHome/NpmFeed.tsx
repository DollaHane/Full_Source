import { Post } from '@prisma/client'
import NpmComponent from './NpmComponent'

interface NpmFeedProps {
  posts: Post[]
}

export default function NpmFeed ({ posts }: NpmFeedProps) {

  return (
    <ul className='flex flex-col col-span-2 space-y-5 mt-10 mb-44 mx-5'>
      {posts?.map((post) => {
        return (
          <NpmComponent
            key={post.id}
            post={post}
          />
        )
      })}
    </ul>
  )
}

