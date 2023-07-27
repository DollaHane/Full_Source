import React from "react"
import { NavBar } from "@/src/components/NavBar"
import GeneralFeed from "@/src/components/pageHome/GeneralFeed"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

export default async function Home() {
  const session = await getServerSession(authOptions)

  return (
    <div className="h-auto w-full">
      {/* NAVBAR */}
       {/* @ts-expect-error Server Component */}
      <NavBar/>

      {/* FEED */}
      {/* @ts-expect-error Server Component */}
      <GeneralFeed /> 
    </div>
  )
}
