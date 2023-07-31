import { Post } from "@prisma/client"

import NpmComponent from "./NpmComponent"

interface NpmFeedProps {
  posts: Post[]
}

export default function NpmFeed({ posts }: NpmFeedProps) {
  return (
    <div className="fixed right-0 h-screen w-3/12 min-w-[200px] overflow-hidden bg-background">
      <ul className="col-span-2 mb-44 mt-10 flex h-full w-full flex-col space-y-5 overflow-scroll px-5">
        <h1 className="text-xl font-bold text-green-500">Init Developement:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Init Developement") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Framework:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Framework") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Database:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Database") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Backend:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Backend") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Authentication:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Authentication") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">State Management:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "State Management") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">
          Forms & Validation:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Forms & Validation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Libraries:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Libraries") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Animation:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Animation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-xl font-bold text-green-500">Services:</h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Services") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <div className="mb-44 h-52" />
      </ul>
    </div>
  )
}
