
import React from 'react'
import { NavBar } from '../../components/NavBar'
import GeneralFeed from '@/src/components/pageHome/GeneralFeed'

export default function Home() {
  return (
    <div className='w-full h-auto'>
      {/* NAVBAR */}
      <NavBar/>

      {/* FEED */}
      <GeneralFeed/>
    </div>
  )
}
