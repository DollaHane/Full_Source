"use client"

import React from "react"
import {
  HoverCard,
  HoverCardContent,
  HoverCardPortal,
  HoverCardTrigger,
} from "@radix-ui/react-hover-card"
import { DiGithubBadge } from "react-icons/di"
import { SiTailwindcss, SiVercel } from "react-icons/si"

import { ExtendedPost } from "../types/db"
import LeftNav from "./LeftNav"
import RightNav from "./RightNav"

interface PostFeedProps {
  npmPosts: ExtendedPost[]
  reactPosts: ExtendedPost[]
  reactNativePosts: ExtendedPost[]
  linuxPosts: ExtendedPost[]
  javascriptPosts: ExtendedPost[]
  javascriptPractisePosts: ExtendedPost[]
  howtoPosts: ExtendedPost[]
}

export default function ToolLinks({
  npmPosts,
  reactPosts,
  reactNativePosts,
  linuxPosts,
  javascriptPosts,
  javascriptPractisePosts,
  howtoPosts,
}: PostFeedProps) {
  const style =
    "outline outline-1 outline-secondary bg-background p-2 rounded-md shadow-md"

  return (
    <div className="z-50 flex w-full justify-between py-2">
      <HoverCard>
        <HoverCardTrigger>
          <LeftNav
            reactPosts={reactPosts}
            reactNativePosts={reactNativePosts}
            linuxPosts={linuxPosts}
            javascriptPosts={javascriptPosts}
            javascriptPractisePosts={javascriptPractisePosts}
            howtoPosts={howtoPosts}
          />
        </HoverCardTrigger>
        <HoverCardContent className={style}>Site Menu</HoverCardContent>
      </HoverCard>
      <HoverCard>
        <HoverCardTrigger>
          <a
            href="https://github.com/DollaHane/Full_Source"
            target="_blank"
            rel="noreferrer"
          >
            <DiGithubBadge className="h-10 w-10 text-primary hover:text-cyan-500" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent className={style}>
          Full_Source GitHub Repo
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <a
            id="vercel"
            href="https://vercel.com"
            target="_blank"
            rel="noreferrer"
          >
            <SiVercel className="h-8 w-8 text-primary hover:text-cyan-500" />
          </a>
        </HoverCardTrigger>
        <HoverCardPortal>
          <HoverCardContent className={style}>
            Vercel Home Page
          </HoverCardContent>
        </HoverCardPortal>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <a
            href="https://nerdcave.com/tailwind-cheat-sheet"
            target="_blank"
            rel="noreferrer"
          >
            <SiTailwindcss className="h-10 w-10 text-primary hover:text-cyan-500" />
          </a>
        </HoverCardTrigger>
        <HoverCardContent className={style}>
          Tailwind Cheat Sheet
        </HoverCardContent>
      </HoverCard>

      <HoverCard>
        <HoverCardTrigger>
          <RightNav npmPosts={npmPosts} />
        </HoverCardTrigger>
        <HoverCardContent className={style}>NPM Menu</HoverCardContent>
      </HoverCard>
    </div>
  )
}
