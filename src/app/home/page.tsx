import React from "react"
import Link from "next/link"
import { db } from "@/src/lib/db"
import { MainNav } from "@/src/components/MainNav"
import { UserAccountNav } from "@/src/components/UserAccountNav"
import { ThemeToggle } from "@/src/components/components-global/theme-toggle"
import { buttonVariants } from "@/src/components/components-ui/Button"
import GeneralFeed from "@/src/components/pageHome/GeneralFeed"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email as string | undefined,
    },
  })

  return (
    <div className="h-auto w-full">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <MainNav items={siteConfig.mainNav} />
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-5">
              {/* SIGN IN */}
              {session?.user && user ? (
                <UserAccountNav user={session.user} admin={user.admin}/>
              ) : (
                <Link href="/sign-in" className={buttonVariants()}>
                  Sign In
                </Link>
              )}

              {/* THEME BUTTON */}
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </header>

      {/* FEED */}
      {/* @ts-expect-error Server Component */}
      <GeneralFeed /> 
    </div>
  )
}
