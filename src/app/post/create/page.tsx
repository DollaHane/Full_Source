import React from "react"
import { NavBar } from "@/src/components/NavBar"
import { Button } from "@/src/components/components-ui/Button"
import Creator from "@/src/components/pagePostCreate/Creator"

export default function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <NavBar />

      {/* PAGE */}
      <div className="mx-auto w-4/5 p-5">
        <div>
          <Creator />
        </div>

        <div className="mt-10 flex justify-end">
          <Button
            type="submit"
            className="w-20 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
            form="workflow-post-form"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
