import "../../styles/globals.css"
import { NavBar } from "@/src/components/NavBar"
import ToolLinks from "@/src/components/ToolLinks"
import { db } from "@/src/lib/db"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const workflowPosts = await db.post.findMany({
    where: {
      categorydoc: "Workflow",
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

  const npmPosts = await db.post.findMany({
    where: {
      type: "NPM Link",
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
    <>
      <html lang="en" suppressHydrationWarning>
        <head></head>
        <head />
        <body>
          <div className="relative flex flex-col">
            {/* @ts-expect-error Server Component */}
            <NavBar />

            <div className="flex justify-between">
              <ToolLinks
                workflowPosts={workflowPosts}
                npmPosts={npmPosts}
              />
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
