"use client"
import Link from "next/link"
import Image from "next/image"

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative mb-12 mt-5 w-1/2">
      <Link href={src}>
        <img
          alt="image"
          className="object-contain h-auto max-h-96 rounded-lg shadow-lg"
          src={src}
        />
      </Link>
    </div>
  )
}

export default CustomImageRenderer
