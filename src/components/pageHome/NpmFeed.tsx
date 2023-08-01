import { Post } from "@prisma/client"

import NpmComponent from "./NpmComponent"

interface NpmFeedProps {
  posts: Post[]
}

export default function NpmFeed({ posts }: NpmFeedProps) {
  return (
    <div className="fixed right-0 h-[850px] w-3/12 min-w-[150px] overflow-hidden bg-background pb-5 z-30">
      <ul className="col-span-2 mt-10 flex h-full w-full flex-col space-y-5 overflow-scroll  px-5">
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Init Developement:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Init Developement") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Framework:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Framework") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Libraries:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Libraries") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Database:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Database") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Backend:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Backend") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Authentication:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Authentication") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          State Management:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "State Management") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Forms & Validation:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Forms & Validation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Animation:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Animation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Services:
        </h1>
        {posts?.map((post) => {
          if (post.categorynpm === "Services") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
      </ul>
    </div>
  )
}
