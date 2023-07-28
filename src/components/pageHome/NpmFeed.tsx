import { Post } from "@prisma/client"

import NpmComponent from "./NpmComponent"

interface NpmFeedProps {
  posts: Post[]
}

export default function NpmFeed({ posts }: NpmFeedProps) {
  console.log("Posts:", posts)

  return (
    <ul className="h-full fixed overflow-scroll col-span-2 mx-5 mb-44 mt-10 flex flex-col space-y-5">
      <h1 className="text-xl font-bold">Init Developement:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Init Developement") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Framework:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Framework") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Database:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Database") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Backend:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Backend") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Authentication:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Authentication") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">State Management:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "State Management") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Forms & Validation:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Form & Validation") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Libraries:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Libraries") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Animation:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Animation") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr></hr>
      <h1 className="text-xl font-bold">Services:</h1>
      {posts?.map((post) => {
        if (post.categorynpm === "Services") {
          return <NpmComponent key={post.id} post={post} />
        }
      })}
      <hr className="mb-44"></hr>
    </ul>
  )
}
