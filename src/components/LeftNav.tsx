"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/components-ui/Sheet"
import { Book, Lightbulb, User } from "lucide-react"
import { ImFinder } from "react-icons/im"

import { ExtendedPost } from "../types/db"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components-ui/Accordion"
import { Button } from "./components-ui/Button"

interface PostFeedProps {
  reactPosts: ExtendedPost[]
  reactNativePosts: ExtendedPost[]
  linuxPosts: ExtendedPost[]
  javascriptPosts: ExtendedPost[]
  howtoPosts: ExtendedPost[]
}

export default function LeftNav({
  reactPosts,
  reactNativePosts,
  linuxPosts,
  javascriptPosts,
  howtoPosts,
}: PostFeedProps) {
  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <Button
            variant={"default"}
            className="ml-5 border-none bg-white/0 text-primary"
          >
            <ImFinder className="h-7 w-7" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="overflow-scroll">
          <SheetHeader>
            <SheetTitle>All the goodies..</SheetTitle>
            <SheetDescription>
              <nav className="items-left flex flex-col rounded-lg bg-background pl-2 text-primary">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="hotlist">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                        Hotlist
                      </p>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        <a
                          href="https://planetscale.com"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          PlanetScale
                        </a>
                        <a
                          href="https://orm.drizzle.team"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          Drizzle ORM
                        </a>
                        <a
                          href="https://vercel.com"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          Vercel
                        </a>
                        <a
                          href="https://expo.dev"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          Expo 
                        </a>
                        <a
                          href="https://ui.shadcn.com/docs"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          Shadcn
                        </a>
                        <a
                          href="https://console.cloud.google.com/"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          Google Cloud Console
                        </a>
                        <a
                          href="https://www.typescripttutorial.net"
                          target="_blank"
                          rel="noreferrer"
                          className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                        >
                          TypeScript Guide
                        </a>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="react">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <a href="/fs/react" className="flex w-full ">
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          React Developement
                        </p>
                      </a>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        {reactPosts && reactPosts.map((post) => {
                          return (
                            <a
                              href={`/fs/post/${post.id}`}
                              className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                            >
                              {post.title}
                            </a>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="native">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <a href="/fs/native" className="flex w-full ">
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          React Native Developement
                        </p>
                      </a>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        {reactNativePosts && reactNativePosts.map((post) => {
                          return (
                            <a
                              href={`/fs/post/${post.id}`}
                              className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                            >
                              {post.title}
                            </a>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="linux">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <a href="/fs/linux" className="flex w-full ">
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          Linux Systems Admin
                        </p>
                      </a>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        {linuxPosts && linuxPosts.map((post) => {
                          return (
                            <a
                              href={`/fs/post/${post.id}`}
                              className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                            >
                              {post.title}
                            </a>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="javascript">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <a href="/fs/javascript" className="flex w-full ">
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          JavaScript 
                        </p>
                      </a>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        {javascriptPosts && javascriptPosts.map((post) => {
                          return (
                            <a
                              href={`/fs/post/${post.id}`}
                              className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                            >
                              {post.title}
                            </a>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="howto">
                    <div className="flex justify-between">
                      <AccordionTrigger className="w-6 justify-center" />
                      <a href="/fs/howto" className="flex w-full ">
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          How To..
                        </p>
                      </a>
                    </div>
                    <AccordionContent>
                      <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                        {howtoPosts && howtoPosts.map((post) => {
                          return (
                            <a
                              href={`/fs/post/${post.id}`}
                              className="w-11/12 truncate rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                            >
                              {post.title}
                            </a>
                          )
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="blog">
                    <div className="flex h-12 justify-between">
                      <a href="/fs/blog" className="flex w-full ">
                        <div className="flex w-6 justify-center">
                          <Book className="my-auto h-6" />
                        </div>
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          Blog
                        </p>
                      </a>
                    </div>
                  </AccordionItem>
                  <AccordionItem value="lessons">
                    <div className="flex h-12 justify-between">
                      <a href="/fs/lessons" className="flex w-full ">
                        <div className="flex w-6 justify-center">
                          <Lightbulb className="my-auto h-6" />
                        </div>
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          Lessons Learnt
                        </p>
                      </a>
                    </div>
                  </AccordionItem>
                  <AccordionItem value="creators">
                    <div className="flex h-12 justify-between">
                      <a href="/fs/creators" className="flex w-full ">
                        <div className="flex w-6 justify-center">
                          <User className="my-auto h-6" />
                        </div>
                        <p className="mx-2 my-auto flex h-5 w-full justify-start text-center hover:text-cyan-500">
                          Content Creators
                        </p>
                      </a>
                    </div>
                  </AccordionItem>
                </Accordion>
              </nav>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  )
}
