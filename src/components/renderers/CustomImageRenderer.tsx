"use client"

import Image from "next/image"

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative my-5 min-h-[25rem] w-9/12">
      <Image
        alt="image"
        className="object-contain"
        fill
        src={src}
      />
    </div>
  )
}

export default CustomImageRenderer
