import Link from "next/link"
import { ThemeToggle } from "@/src/components/components-global/theme-toggle"
import { siteConfig } from "@/src/config/site"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

import { db } from "../lib/db"
import { MainNav } from "./MainNav"
import { UserAccountNav } from "./UserAccountNav"
import { buttonVariants } from "./components-ui/Button"
import { redirect } from "next/navigation"

export async function NavBar() {

  const session = await getServerSession(authOptions)
  if(session == null){
    return redirect("/sign-in")
  }

  const user = await db.user.findUnique({
    where: {
      email: session?.user.email as string | undefined,
    },
  })

  return (
    <header className="sticky top-0 z-50 w-full border-b border-secondary backdrop-blur-md">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">
            {/* SIGN IN */}
            {session?.user && user ? (
              <UserAccountNav user={session.user} admin={user.admin} />
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
  )
}
