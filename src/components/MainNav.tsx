import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/src/config/site"
import { cn } from "@/src/lib/utils"
import { NavItem } from "@/src/types/types"

import FS from "../assets/FS-Logo.png"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="mx-auto flex h-10 w-10 flex-col justify-center rounded-full bg-capecod-50">
        <Image alt="logo" src={FS} className="mx-auto h-9 w-9 content-center" />
      </div>
      <Link
        href="/"
        className="flex items-center space-x-2 bg-gradient-to-r from-rose-400 via-cyan-500 to-green-500 bg-clip-text bg-repeat-x text-transparent"
      >
        <span className="inline-block font-prompt font-bold">
          {siteConfig.name}
        </span>
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
