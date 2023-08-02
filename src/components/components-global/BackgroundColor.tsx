"use client"

import React from "react"
import { useTheme } from "next-themes"

export default function BackgroundColor() {
  const { theme } = useTheme()
  console.log(theme)

  return (
    <div className="fixed">
      {theme === "light" ? (
        <div>
          <div className="blob via-grey-950 absolute left-0 top-0 z-10 h-[200px] w-[1000px] rotate-45 rounded-full bg-opacity-20 bg-gradient-to-r from-cyan-50 to-blue-100 blur-2xl" />
        </div>
      ) : (
        <div>
          <div className="blob via-grey-950 absolute left-0 top-0 z-10 h-[200px] w-[1000px] rotate-45 rounded-full bg-opacity-20 bg-gradient-to-r from-capecod-800 to-capecod-950 blur-2xl" />
        </div>
      )}
    </div>
  )
}
