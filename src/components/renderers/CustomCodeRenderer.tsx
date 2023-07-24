'use client'
import React, { useRef, useState } from "react"
import { Button } from "../components-ui/Button"
import { Copy } from 'lucide-react'

export default function CustomCodeRenderer({ data }: any) {
  (data)

  const text = data.code

  return (
    <pre className='w-full flex relative bg-capecod-600 rounded-md p-4'>
      <code className='text-capecod-50 text-sm'>{data.code}</code>
      <Button
        className='hover:bg-transparent absolute top-1 right-1'
        onClick={() => {
          navigator.clipboard.writeText(text);}}
        size='sm'
        variant='ghost'>
        <Copy className="text-capecod-50"/>
      </Button>
    </pre>
  )
}



