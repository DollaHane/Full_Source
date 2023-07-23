import * as React from "react"
import Link from "next/link"
import Image from "next/image"

import { NavItem } from "@/src/types/types"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import FS from '../assets/FS-Logo.png'

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="mx-auto flex flex-col justify-center w-10 h-10 bg-capecod-50 rounded-full">
        <Image alt='logo' src={FS} className="content-center h-9 w-9 mx-auto" />
      </div>
      <Link href="/home" className="flex items-center space-x-2 bg-clip-text bg-repeat-x text-transparent bg-gradient-to-r from-rose-400 via-cyan-500 to-green-500">
        <span className="inline-block font-bold font-prompt">{siteConfig.name}</span>
      </Link>

      {items?.length ? (
        <nav className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <Link
                  key={index}
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-medium text-muted-foreground",
                    item.disabled && "cursor-not-allowed opacity-80"
                  )}
                >
                  {item.title}
                </Link>
              )
          )}
        </nav>
      ) : null}
    </div>
  )
}
