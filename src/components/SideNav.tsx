import { ExtendedPost } from "../types/db"
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

interface SideNavProps {
  workflowPosts: ExtendedPost[]
}

export async function SideNav({ workflowPosts }: SideNavProps) {
  return (
    <div className="fixed h-full z-50">
      <AccordionMod type="single" collapsible className="h-full backdrop-blur-md pt-3 px-3">
        <AccordionItemMod value="Menu" className="">
          <AccordionTriggerMod className="h-5"/>
          <AccordionContentMod>
            <nav className="items-left flex flex-col space-x-5">
              <Accordion type="single" collapsible className="w-[300px]">
                <AccordionItem value="home">
                  <div className="flex justify-between">
                    <a href="/home" className="flex w-1/2">
                      <p className="my-auto flex h-1/2 w-full text-center">
                        Home
                      </p>
                    </a>
                    <AccordionTrigger />
                  </div>
                  <AccordionContent>
                    <ul className="ml-3 mt-1 flex flex-col gap-2 truncate text-sm">
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
              </Accordion>
            </nav>
          </AccordionContentMod>
        </AccordionItemMod>
      </AccordionMod>
    </div>
  )
}
