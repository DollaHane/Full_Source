"use client"

import React from "react"
import { Copy } from "lucide-react"

import { Button } from "../components-ui/Button"

export default function CustomCodeRenderer({ data }: any) {
  data

  const text = data.code

  return (
    <pre className="relative mb-10 flex w-full rounded-md bg-capecod-600 p-4">
      <code className="text-xs text-capecod-50">{data.code}</code>
      <Button
        className="absolute right-1 top-1 bg-capecod-600 hover:bg-capecod-400"
        onClick={() => {
          navigator.clipboard.writeText(text)
        }}
        size="sm"
        variant="ghost"
      >
        <Copy className="text-capecod-50" />
      </Button>
    </pre>
  )
}
