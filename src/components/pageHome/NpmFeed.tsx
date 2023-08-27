"use client"

import { ExtendedPost } from "@/src/types/db"

import NpmComponent from "./NpmComponent"

interface PostFeedProps {
  npmPosts: ExtendedPost[]
}

export default function NpmFeed({ npmPosts }: PostFeedProps) {
  return (
    <div className="z-30 mb-10 w-full rounded-lg bg-background py-5">
      <ul className="col-span-2 flex h-full w-full flex-col space-y-5 overflow-scroll  px-5">
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Init Developement:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Init Developement") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Framework:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Framework") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Libraries:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Libraries") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Database:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Database") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Backend:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Backend") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Authentication:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Authentication") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          State Management:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "State Management") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Forms & Validation:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Forms & Validation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>

        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Animation:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Animation") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
        <hr></hr>
        <h1 className="text-sm font-bold text-green-500 md:text-base">
          Services:
        </h1>
        {npmPosts?.map((post: ExtendedPost) => {
          if (post.categorynpm === "Services") {
            return <NpmComponent key={post.id} post={post} />
          }
        })}
      </ul>
    </div>
  )
}
