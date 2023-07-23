import React from 'react'
import { NavBar } from '@/src/components/NavBar'
import Creator from '@/src/components/pagePostCreate/Creator'
import { Button } from '@/src/components/components-ui/Button'


export default function Home() {
  return (
    <div>
      {/* NAVBAR */}
      <NavBar/>

      {/* PAGE */}
      <div className='w-4/5 mx-auto p-5'>
        <div>
          <Creator/>
        </div>

        <div className='w-full flex justify-start mt-10'>
          <Button type='submit' className='w-20 bg-capecod-600 hover:bg-background text-zinc-50 hover:text-primary shadow-lg rounded-full hover:border border-cyan-500' form='workflow-post-form'>
            Post
          </Button>
        </div>
      </div>

    </div>
  )
}
