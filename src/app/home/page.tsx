import React from "react"
import GeneralFeed from "@/src/components/pageHome/GeneralFeed"

import { NavBar } from "../../components/NavBar"

export default function Home() {
  return (
    <div className="h-auto w-full">
      {/* NAVBAR */}
      <NavBar />

      {/* FEED */}
      <GeneralFeed />
    </div>
  )
}
