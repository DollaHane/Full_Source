import Image from "next/image"
import Link from "next/link"
import { authOptions } from "@/src/lib/auth"
import { getServerSession } from "next-auth"

// ICON Imports
import Next from "../assets/nextjs_icon_132160.svg"
import PlanetScale from "../assets/planetscale_logo_icon_248841.svg"
import Prisma from "../assets/prisma_icon_132076.svg"
import ReactLogo from "../assets/react_icon_196203.svg"
import Tailwind from "../assets/tailwind_icon_131947.svg"
import Vercel from "../assets/vercel_logo_icon_249276.svg"
// COMPONENT Imports
import { Button } from "../components/components-ui/Button"
import styles from "./page.module.css"

export default async function IndexPage() {
  const session = await getServerSession(authOptions)
  console.log(session)

  return (
    <main className="h-full w-full">
      {/* TOP SECTION */}
      <div className="h-full w-full z-40">
        <div className={styles.backgroundA} />
        <div className={styles.backgroundB} />
      </div>

      {/* BOTTOM SECTION */}
      <div className="mt-[35vh] h-full w-full p-10 z-40">
        <h1 className="mt-5 bg-gradient-to-r from-rose-400 via-cyan-500 to-green-500 bg-clip-text bg-repeat-x text-center font-prompt text-5xl font-bold text-transparent md:text-8xl">
          FULL_SOURCE
        </h1>
        <p className="mt-10 text-center font-galada text-2xl md:text-3xl">
          An all-in-one carefully packaged recource for full stack web
          application developement
        </p>

        {session?.user ? (
          <div className="flex flex-col">
            <p className="w-62 text-md mx-auto mt-10 md:text-lg">
              {`Welcome ${session.user.name}!`}
            </p>
            <Link href="/home">
              <Button
                variant="outline"
                className="mx-auto mt-10 flex w-44 rounded-full border-cyan-500 bg-rose-600 font-bold text-zinc-50 shadow-lg hover:border hover:bg-rose-400"
              >
                GET STARTED
              </Button>
            </Link>
          </div>
        ) : (
          <Link href="/sign-in">
            <Button
              variant="outline"
              className="mx-auto mt-10 flex w-44 rounded-full border-cyan-500 bg-rose-600 font-bold text-zinc-50 shadow-lg hover:border hover:bg-rose-400"
            >
              SIGN IN
            </Button>
          </Link>
        )}

        {/* GRID SECTION */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* TEXT */}
          <div className="flex w-full flex-col content-center justify-center p-5">
            <p className="w-7/8 text-md text-left md:text-lg">
              Curated, updated and maintained by @dollahane, for himself...
            </p>
            <p className="w-7/8 text-md mt-5 text-right md:text-lg">
              and well, for whom ever may stumble upon it :)
            </p>
          </div>

          {/* ICONS */}
          <div className="flex w-full flex-wrap content-center justify-center gap-5 p-5">
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="react"
                src={ReactLogo}
                className="absolute z-40 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="next"
                src={Next}
                className="absolute z-40 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="vercel"
                src={Vercel}
                className="absolute z-40 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="pscale"
                src={PlanetScale}
                className="absolute z-40 h-16 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="prisma"
                src={Prisma}
                className="absolute z-40 h-16 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
            <div className="relative flex h-20 w-20 content-center justify-center">
              <Image
                alt="tailwind"
                src={Tailwind}
                className="absolute z-40 h-16 w-16 rounded-full bg-capecod-50 p-3 shadow-lg"
              />
              <div className="absolute left-1 top-1 z-30 h-16 w-16 rounded-full bg-cyan-500" />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
