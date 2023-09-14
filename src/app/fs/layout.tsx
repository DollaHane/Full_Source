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
          <div className="flex w-full flex-col">
            {/* @ts-expect-error Server Component */}
            <NavBar />

            <div className="mx-auto flex w-11/12">
              <ToolLinks workflowPosts={workflowPosts} npmPosts={npmPosts} />
              <div className="fixed z-40 mt-16 flex h-20 w-11/12 justify-between rounded-b-3xl bg-gradient-to-b from-secondary/70 via-secondary/30 to-secondary/0 py-5" />
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
