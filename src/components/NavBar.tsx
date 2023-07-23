import Link from "next/link"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from 'next-auth'

import { siteConfig } from "@/src/config/site"
import { MainNav } from "./MainNav"
import { ThemeToggle } from "@/src/components/components-global/theme-toggle"
import { buttonVariants } from './components-ui/Button'
import { UserAccountNav } from "./UserAccountNav"

export async function NavBar() {

  const session = await getServerSession(authOptions)

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-5">

            {/* SIGN IN */}
            {session?.user ? (
               <UserAccountNav user={session.user} />
              ) : (
                <Link href='/sign-in' className={buttonVariants()}>
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
