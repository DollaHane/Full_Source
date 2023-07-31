import { ExtendedPost } from "../types/db"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./components-ui/Accordion"

interface SideNavProps {
  workflowPosts: ExtendedPost[]
}

export async function SideNav({ workflowPosts }: SideNavProps) {
  return (
    <div className="mx-5 mb-44 mt-10 h-full">
      <nav className="items-left flex flex-col space-x-5">
        <Accordion type="single" collapsible className="w-44">
          <AccordionItem value="home">
            <div className="flex justify-between">
              <a href="/home" className="flex w-1/2">
                <p className="flex w-full h-1/2 my-auto text-center">
                  Home
                </p>
              </a>
              <AccordionTrigger/>
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
    </div>
  )
}
