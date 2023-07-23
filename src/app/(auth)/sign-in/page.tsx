import SignIn from '@/src/components/pageSignin/SignIn'
import { buttonVariants } from '../../../components/components-ui/Button'
import { cn } from '@/src/lib/utils'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import { FC } from 'react'
import styles from './page.module.css'

const page: FC = () => {
  return (
    <div className='absolute inset-0'>
      <div className='h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20'>
        <SignIn />
      </div>
    </div>
  )
}

export default page
