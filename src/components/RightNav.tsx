"use client"

import React from "react"
import { Drawer, Group } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { Menu } from "lucide-react"

import { ExtendedPost } from "../types/db"
import { Button } from "./components-ui/Button"
import NpmFeed from "./pageHome/NpmFeed"

interface PostFeedProps {
  npmPosts: ExtendedPost[]
}

export default function RightNav({ npmPosts }: PostFeedProps) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <div>
      <Group position="right">
        <Button
          variant={"outline"}
          onClick={open}
          className="mr-5 mt-5 bg-opacity-0 text-primary"
        >
          <Menu />
        </Button>
      </Group>
      <Drawer
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        opened={opened}
        onClose={close}
        title="NPM Packages"
        transitionProps={{
          transition: "rotate-left",
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <NpmFeed npmPosts={npmPosts} />
      </Drawer>
    </div>
  )
}
