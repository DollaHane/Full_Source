"use client"
import { ExtendedPost } from "../types/db"

interface SideNavProps {
  workflowPosts: ExtendedPost[]
}

export async function SideNav({ workflowPosts }: SideNavProps) {

  return (
    <div className="h-full overflow-scroll mx-5 mb-44 mt-10">
        <nav className="flex flex-col items-left space-x-5">
          <div>
            <p>
              Workflow
            </p>
            <ul className="flex flex-col mt-1 ml-3 text-sm gap-2 truncate">
              {workflowPosts.map((post) => {
                return(
                  <a 
                    href={`/post/${post.id}`}
                    className="bg-secondary p-1 hover:text-cyan-500 rounded"
                  >
                    {post.title}
                  </a>
                )
              })}
            </ul>
          </div>
          
        </nav>
    </div>
  )
}
