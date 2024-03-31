"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "../components-ui/Button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      className="border-hidden outline-0 hover:bg-transparent h-5 p-0"
      variant="ghost"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <p className="text-muted-foreground hover:text-primary dark:block">Theme: Dark</p>
      <p className="text-muted-foreground dark:hidden">Theme: Light</p>
    </Button>
  )
}
