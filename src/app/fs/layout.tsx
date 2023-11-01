import "../../styles/globals.css"
import { NavBar } from "@/src/components/NavBar"
import ToolLinks from "@/src/components/ToolLinks"
import { db } from "@/src/lib/db"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const reactPosts = await db.post.findMany({
    where: {
      categorydoc: "React Developement",
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

  const reactNativePosts = await db.post.findMany({
    where: {
      categorydoc: "React Native Developement",
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

  const linuxPosts = await db.post.findMany({
    where: {
      categorydoc: "Linux Systems Admin",
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

  const howtoPosts = await db.post.findMany({
    where: {
      categorydoc: "How To",
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
        <header/>
        <head />
        <body>
          <div className="flex w-full flex-col">
            {/* @ts-expect-error Server Component */}
            <NavBar />

            <div className="mx-auto flex w-11/12">
              <ToolLinks reactPosts={reactPosts} reactNativePosts={reactNativePosts} linuxPosts={linuxPosts} howtoPosts={howtoPosts} npmPosts={npmPosts} />
              <div className="fixed z-40 mt-16 flex h-20 w-11/12 justify-between rounded-b-3xl bg-gradient-to-b from-secondary/70 via-secondary/30 to-secondary/0 py-5" />
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
