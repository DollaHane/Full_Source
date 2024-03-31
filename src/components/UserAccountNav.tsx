"use client"

import Link from "next/link"
import { User } from "next-auth"
import { signOut } from "next-auth/react"

import { ThemeToggle } from "./components-global/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./components-ui/DropdownMenu"
import { UserAvatar } from "./components-ui/UserAvatar"

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  user: Pick<User, "name" | "image" | "email">
  admin: boolean
}

export function UserAccountNav({ user, admin }: UserAccountNavProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <UserAvatar
          user={{ name: user.name || null, image: user.image || null }}
          className="h-8 w-8"
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="relative bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-cyan-600">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {admin === true && (
          <DropdownMenuItem asChild>
            <Link href="/fs/post/create">Create Post</Link>
          </DropdownMenuItem>
        )}

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/fs/settings">Settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem>
          {/* THEME BUTTON */}
          <ThemeToggle />
        </DropdownMenuItem>
        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer bg-rose-500 text-capecod-50"
          onSelect={(event) => {
            event.preventDefault()
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            })
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
