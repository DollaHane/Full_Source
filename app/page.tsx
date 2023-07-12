import Image from 'next/image'
import Link from 'next/link'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// COMPONENT Imports
import { Button } from './components-ui/Button'
import { buttonVariants } from './components-ui/Button'
import styles from './page.module.css'

// ICON Imports
import Next from './assets/nextjs_icon_132160.svg'
import Vercel from './assets/vercel_logo_icon_249276.svg'
import PlanetScale from './assets/planetscale_logo_icon_248841.svg'
import Prisma from './assets/prisma_icon_132076.svg'
import ReactLogo from './assets/react_icon_196203.svg'
import Tailwind from './assets/tailwind_icon_131947.svg'

export default async function IndexPage() {

  const session = await getServerSession(authOptions)

  return (
    <main className="w-full h-full">
      
      {/* TOP SECTION */}
      <div className="w-full h-full">
        <div className={styles.backgroundA}/>
        <div className={styles.backgroundB}/>
      </div>

      {/* BOTTOM SECTION */}
      <div className='w-full h-full mt-[35vh] p-10'>

        <h1 className='text-5xl md:text-8xl text-center font-cinzel font-bold mt-5 bg-clip-text bg-repeat-x text-transparent bg-gradient-to-r from-rose-400 via-cyan-500 to-green-500'>
          FULL_SOURCE
        </h1>
        <p className='text-2xl md:text-3xl font-galada text-center mt-10'>
          An all-in-one carefully packaged recource for full stack web application developement 
        </p>

        {session?.user ? (
          <Button variant='outline' className='flex mt-10 w-44 mx-auto font-bold hover:bg-rose-500 hover:text-zinc-100'>
            GET STARTED
          </Button>
          ) : (
            <Link href='/sign-in'>
              <Button variant='outline' className='flex mt-10 w-44 mx-auto font-bold hover:bg-rose-500 hover:text-zinc-100'>
                SIGN IN
              </Button>
            </Link>
        )}

        {/* GRID SECTION */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-10'>

          {/* TEXT */}
          <div className='p-5 flex flex-col justify-center content-center w-full'>
            <p className='w-7/8 text-md md:text-lg font-chivo text-left'>
              "Curated, updated and maintained by @dollahane, for himself...
            </p>
            <p className='w-7/8 text-md md:text-lg font-chivo text-right mt-5'>
              and well, for whom ever may stumble upon it :) "
            </p>
            
          </div>

          {/* ICONS */}
          <div className='flex flex-wrap gap-5 p-5 justify-center content-center w-full'>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='react' src={ReactLogo} className='absolute w-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='next' src={Next} className='absolute w-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='vercel' src={Vercel} className='absolute w-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='pscale' src={PlanetScale} className='absolute w-16 h-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='prisma' src={Prisma} className='absolute w-16 h-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
            <div className='relative flex w-20 h-20 justify-center content-center'>
              <Image alt='tailwind' src={Tailwind} className='absolute w-16 h-16 bg-capecod-50 rounded-full p-3 shadow-lg z-40'/>
              <div className='absolute w-16 h-16 top-1 left-1 bg-cyan-500 rounded-full z-30'/>
            </div>
          </div>

        </div>


      </div>
    </main>
  )
}
