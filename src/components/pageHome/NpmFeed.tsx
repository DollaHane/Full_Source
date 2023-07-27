import { Post } from "@prisma/client"

import NpmComponent from "./NpmComponent"

interface NpmFeedProps {
  posts: Post[]
}

export default function NpmFeed({ posts }: NpmFeedProps) {
  return (
    <ul className="col-span-2 mx-5 mb-44 mt-10 flex flex-col space-y-5">
      {posts?.map((post) => {
        return <NpmComponent key={post.id} post={post} />
      })}
    </ul>
  )
}
