"use client"

import React from "react"
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
    <div>
      <Group position="right">
        <Button
          variant={"default"}
          onClick={open}
          className="mr-5 bg-white/0 text-primary"
        >
          <DiNpm className="h-10 w-10" />
        </Button>
      </Group>
      <Drawer
        position="right"
        overlayProps={{ opacity: 0.5, blur: 4 }}
        opened={opened}
        onClose={close}
        title="NPM Packages"
        transitionProps={{
          duration: 150,
          timingFunction: "linear",
        }}
      >
        <NpmFeed npmPosts={npmPosts} />
      </Drawer>
    </div>
  )
}
