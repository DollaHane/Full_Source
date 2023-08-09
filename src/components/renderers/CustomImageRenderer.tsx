"use client"

import Image from "next/image"

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative mx-auto my-5 min-h-[15rem] w-auto">
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
