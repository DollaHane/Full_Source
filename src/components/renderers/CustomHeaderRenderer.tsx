"use client"

function CustomHeaderRenderer({ data }: any) {
  return (
    <div className="w-full">
      <header className="text-lg font-bold">{data.text}</header>
    </div>
  )
}

export default CustomHeaderRenderer
