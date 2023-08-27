'use client'
import React from "react"
import { Button } from "./components-ui/Button"
import { Drawer, Group } from "@mantine/core"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components-ui/Accordion"
import { useDisclosure } from "@mantine/hooks"
import { Book, LayoutList, Lightbulb, User, Menu } from "lucide-react"
import { ExtendedPost } from "../types/db"
import BackgroundColor from "./components-global/BackgroundColor"

interface PostFeedProps {
  workflowPosts: ExtendedPost[]
}

export default function LeftNav({ workflowPosts }: PostFeedProps) {
  const [opened, { open, close }] = useDisclosure(false)


  return (
    <div>
      <Group position="left">
        <Button 
          variant={"outline"} 
          onClick={open} 
          className="bg-opacity-0 ml-5 mt-5 text-primary"
        >
          <Menu/>
        </Button>
      </Group>
      <Drawer
        overlayProps={{ opacity: 0.5, blur: 4 }}
        opened={opened}
        onClose={close}
        title="Navigation"
        transitionProps={{
          transition: "rotate-right",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <nav className="items-left flex flex-col bg-background text-primary pl-2 rounded-lg">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="home">
              <div className="flex justify-between">
                <AccordionTrigger className="w-6 justify-center" />
                <a href="/fs/home" className="flex w-full ">
                  <p className="my-auto ml-2 flex h-5 w-full justify-start text-center hover:text-cyan-500">
                    Home
                  </p>
                </a>
              </div>
              <AccordionContent>
                <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm text-primary">
                  {workflowPosts.map((post) => {
                    return (
                      <a
                        href={`/fs/post/${post.id}`}
                        className="w-11/12 rounded bg-secondary p-1 text-sm hover:text-cyan-500"
                      >
                        {post.title}
                      </a>
                    )
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="howto">
              <div className="flex h-12 justify-between">
                <a href="/fs/howto" className="flex w-full ">
                  <div className="flex w-6 justify-center">
                    <LayoutList className="my-auto h-6" />
                  </div>
                  <p className="my-auto ml-2 flex h-5 w-full justify-start text-center hover:text-cyan-500">
                    How To..
                  </p>
                </a>
              </div>
            </AccordionItem>
            <AccordionItem value="blog">
              <div className="flex h-12 justify-between">
                <a href="/fs/blog" className="flex w-full ">
                  <div className="flex w-6 justify-center">
                    <Book className="my-auto h-6" />
                  </div>
                  <p className="my-auto ml-2 flex h-5 w-full justify-start text-center hover:text-cyan-500">
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
                  <p className="my-auto ml-2 flex h-5 w-full justify-start text-center hover:text-cyan-500">
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
                  <p className="my-auto ml-2 flex h-5 w-full justify-start text-center hover:text-cyan-500">
                    Content Creators
                  </p>
                </a>
              </div>
            </AccordionItem>
          </Accordion>
        </nav>
      </Drawer>
    </div>
  )
}
