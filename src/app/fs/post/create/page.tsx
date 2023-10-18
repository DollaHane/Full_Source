import React from "react"
import { Button } from "@/src/components/components-ui/Button"
import Creator from "@/src/components/pagePostCreate/Creator"

export default function Home() {
  return (
    <div>
      {/* PAGE */}
      <div className="mx-auto w-full p-5 md:w-8/12">
        <div>
          <Creator />
        </div>

        <div className="mt-10 flex justify-start">
          <div>
            <Button
              type="submit"
              className="w-20 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-cyan-100 hover:text-capecod-800"
              form="workflow-post-form"
            >
              Post
            </Button>
          </div>
          <div className="ml-10">
            <a href="/fs/react">
              <Button className="w-20 rounded-full border-rose-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-rose-100 hover:text-capecod-800">
                Cancel
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
