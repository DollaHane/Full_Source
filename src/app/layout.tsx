import "../styles/globals.css"
import { Metadata } from "next"
import { siteConfig } from "@/src/config/site"
import { fontSans } from "@/src/lib/fonts"
import { cn } from "@/src/lib/utils"

import Providers from "../components/components-global/Providers"
import { TailwindIndicator } from "../components/components-global/tailwind-indicator"
import { ThemeProvider } from "../components/components-global/theme-provider"
import { Toaster } from "../components/components-ui/Toaster"

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link
            href="https://fonts.googleapis.com/css2?family=Bangers&family=Bungee+Inline&family=Chivo+Mono:wght@300&family=Cinzel&family=Cinzel+Decorative&family=Fauna+One&family=Galada&family=Indie+Flower&family=Open+Sans&family=Press+Start+2P&family=Prompt:wght@400;600&family=Rampart+One&family=Sigmar+One&family=Sonsie+One&family=Urbanist:ital,wght@0,400;1,600&display=swap"
            rel="stylesheet"
          />
        </head>
        <head />
        <body
          className={cn(
            "min-h-screen bg-background font-sans antialiased",
            fontSans.variable
          )}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Providers>
              <div className="relative flex flex-col">
                <div className="flex-1">{children}</div>
              </div>
              <TailwindIndicator />
            </Providers>
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}
