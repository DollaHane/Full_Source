
import { ExtendedPost } from "../types/db"

interface SideNavProps {
  workflowPosts: ExtendedPost[]
}

export async function SideNav({ workflowPosts }: SideNavProps) {

  return (
    <div className="h-full min-w-44 overflow-scroll mx-5 mb-44 mt-10">
        <nav className="flex flex-col items-left space-x-5">
          <div>
            <a href='/home'>
              <p>
                Home
              </p>
            </a>
            <ul className="flex flex-col mt-1 ml-3 text-sm gap-2 truncate">
              {workflowPosts.map((post) => {
                return(
                  <a 
                    href={`/post/${post.id}`}
                    className="bg-secondary p-1 text-sm hover:text-cyan-500 rounded"
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
