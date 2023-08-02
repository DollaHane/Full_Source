
import { db } from "../lib/db"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components-ui/Accordion"
import {
  AccordionContentMod,
  AccordionItemMod,
  AccordionMod,
  AccordionTriggerMod,
} from "./components-ui/AccordionMod"
import { Lightbulb } from "lucide-react"
import { Book } from "lucide-react"
import { LayoutList } from "lucide-react"
import { User } from "lucide-react"



export async function SideNav() {

  const workflowPosts = await db.post.findMany({
    where: {
      categorydoc: "Workflow"
    },
    orderBy: {
      index: "asc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })


  return (
    <div className="fixed h-full z-50">
      <AccordionMod type="single" collapsible className="h-full backdrop-blur-md pt-3 px-3">
        <AccordionItemMod value="Menu">
          <AccordionTriggerMod className="h-5"/>
          <AccordionContentMod>
            <nav className="items-left flex flex-col space-x-5">
              <Accordion type="single" collapsible className="w-[400px]">
                <AccordionItem value="home">
                  <div className="flex justify-between">
                  <AccordionTrigger className="w-6 justify-center"/>
                    <a href="/home" className="flex w-full ">
                      <p className="my-auto ml-2 flex h-5 w-full text-center justify-start hover:text-cyan-500">
                        Home
                      </p>
                    </a>
                  </div>
                  <AccordionContent>
                    <ul className="ml-8 mt-1 flex flex-col gap-2 truncate text-sm">
                      {workflowPosts.map((post) => {
                        return (
                          <a
                            href={`/post/${post.id}`}
                            className="rounded bg-secondary p-1 text-sm hover:text-cyan-500"
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
                    <a href="/howto" className="flex w-full ">
                      <div className="flex w-6 justify-center">
                        <LayoutList className="h-6 my-auto"/>
                      </div>
                      <p className="my-auto ml-2 flex h-5 w-full text-center justify-start hover:text-cyan-500">
                        How To..
                      </p>
                    </a>
                  </div>
                </AccordionItem>
                <AccordionItem value="blog">
                  <div className="flex h-12 justify-between">
                    <a href="/blog" className="flex w-full ">
                    <div className="flex w-6 justify-center">
                        <Book className="h-6 my-auto"/>
                      </div>
                      <p className="my-auto ml-2 flex h-5 w-full text-center justify-start hover:text-cyan-500">
                        Blog
                      </p>
                    </a>
                  </div>
                </AccordionItem>
                <AccordionItem value="lessons">
                  <div className="flex h-12 justify-between">
                    <a href="/lessons" className="flex w-full ">
                    <div className="flex w-6 justify-center">
                        <Lightbulb className="h-6 my-auto"/>
                      </div>
                      <p className="my-auto ml-2 flex h-5 w-full text-center justify-start hover:text-cyan-500">
                        Lessons Learnt
                      </p>
                    </a>
                  </div>
                </AccordionItem>
                <AccordionItem value="creators">
                  <div className="flex h-12 justify-between">
                    <a href="/creators" className="flex w-full ">
                    <div className="flex w-6 justify-center">
                        <User className="h-6 my-auto"/>
                      </div>
                      <p className="my-auto ml-2 flex h-5 w-full text-center justify-start hover:text-cyan-500">
                        Content Creators
                      </p>
                    </a>
                  </div>
                </AccordionItem>
              </Accordion>
            </nav>
          </AccordionContentMod>
        </AccordionItemMod>
      </AccordionMod>
    </div>
  )
}
