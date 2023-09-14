"use client"

import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/components-ui/Sheet"
import { Drawer, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { DiNpm } from "react-icons/di"

import { ExtendedPost } from "../types/db"
import { Button } from "./components-ui/Button"
import NpmFeed from "./pageHome/NpmFeed"

interface PostFeedProps {
  npmPosts: ExtendedPost[]
}

export default function RightNav({ npmPosts }: PostFeedProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <nav>
      <Sheet>
        <SheetTrigger>
          <Button variant={"default"} className="mr-5 bg-white/0 text-primary">
            <DiNpm className="h-10 w-10" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="overflow-scroll">
          <SheetHeader>
            <SheetTitle>More goodies!</SheetTitle>
            <SheetDescription>
              <NpmFeed npmPosts={npmPosts} />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
