"use client"

import Link from "next/link"

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative mb-12 mt-5 w-full md:w-1/2">
      <Link href={src} target="_blank">
        <img
          alt="image"
          className="h-auto max-h-96 rounded-lg object-contain shadow-lg"
          src={src}
        />
      </Link>
    </div>
  )
}

export default CustomImageRenderer
