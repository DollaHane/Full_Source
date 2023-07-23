import { Icons } from '../components-ui/icons'
import Image from 'next/image'
import UserAuthForm from './UserAuthForm'
import FS from '../../assets/FS-Logo.png'

const SignIn = () => {
  return (
    <div className='container mx-auto flex w-full flex-col justify-center space-y-10 sm:w-[400px]'>
      <div className='flex flex-col space-y-2 text-center'>
        <div><Image alt='logo' src={FS} className='bg-white p-10 rounded-3xl mb-10'/></div>
        <h1 className='text-2xl font-semibold tracking-tight'>Welcome!</h1>
        <p className='text-sm max-w-xs mx-auto'>
          By continuing, you are setting up a Full_Source account and agree to our
          User Agreement and Privacy Policy.
        </p>
      </div>
      <UserAuthForm />
    </div>
  )
}

export default SignIn
