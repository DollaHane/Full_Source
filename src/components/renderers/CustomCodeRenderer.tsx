"use client"

import React from "react"
import { Copy } from "lucide-react"

import { Button } from "../components-ui/Button"

export default function CustomCodeRenderer({ data }: any) {
  data

  const text = data.code

  return (
    <pre className="relative flex w-full rounded-md bg-capecod-600 p-4">
      <code className="text-sm text-capecod-50">{data.code}</code>
      <Button
        className="absolute right-1 top-1 hover:bg-transparent"
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
