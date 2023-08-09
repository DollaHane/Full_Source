"use client"

import Image from "next/image"

function CustomImageRenderer({ data }: any) {
  const src = data.file.url

  return (
    <div className="relative mx-auto my-5 min-h-[15rem] w-full">
      <Image
        alt="image"
        className="rounded-md object-cover shadow-lg"
        fill
        src={src}
      />
    </div>
  )
}

export default CustomImageRenderer
