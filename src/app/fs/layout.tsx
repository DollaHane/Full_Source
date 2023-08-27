import "../../styles/globals.css"
import LeftNav from "@/src/components/LeftNav"
import { NavBar } from "@/src/components/NavBar"
import RightNav from "@/src/components/RightNav"
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
          <div className="relative flex min-h-screen flex-col">
            {/* NAVBAR */}
            {/* @ts-expect-error Server Component */}
            <NavBar />

            <div className="flex justify-between">
              {/* @ts-expect-error Server Component */}
              <LeftNav workflowPosts={workflowPosts} />

              {/* @ts-expect-error Server Component */}
              <RightNav npmPosts={npmPosts} />
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
