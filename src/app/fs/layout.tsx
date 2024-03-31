import "../../styles/globals.css"
import { NavBar } from "@/src/components/NavBar"
import ToolLinks from "@/src/components/ToolLinks"
import { db } from "@/src/lib/db"

interface RootLayoutProps {
  children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <header />
        <head />
        <body>
          <div className="flex w-full flex-col">
            {/* @ts-expect-error Server Component */}
            <NavBar />

            <div className="flex-1">{children}</div>
          </div>
        </body>
      </html>
    </>
  )
}
