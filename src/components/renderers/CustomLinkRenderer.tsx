import React from "react"

export default function CustomLinkRenderer({ data }: any) {
  const handleClick = () => {
    let win = window.open(data.link, "_blank")
    win?.focus()
  }

  console.log("link data:", data.link)

  return (
    <div
      className="mt-5 flex h-auto max-h-44 w-full flex-row gap-5 overflow-hidden rounded-lg border border-l-4 border-s-orange-400 border-t-orange-400 p-5 shadow-lg"
      onClick={handleClick}
    >
      <div className="w-7/12 overflow-hidden">
        {data.meta?.title && (
          <p className="h-10 w-full truncate text-xl font-bold">
            {data.meta?.title}
          </p>
        )}
        <div className="overflow-hidden">
          {data.meta?.description && (
            <p className="text-xs text-capecod-400">{data.meta?.description}</p>
          )}
          {data.meta?.site_name && (
            <p className="text-xs">{data.meta?.site_name}</p>
          )}
        </div>
      </div>

      <div className="w-5/12 overflow-hidden rounded-lg">
        {data.meta?.image?.url && (
          <img
            src={data.meta?.image?.url}
            alt={data.meta?.title}
            className="rounded-lg object-contain"
          />
        )}
      </div>
    </div>
  )
}
