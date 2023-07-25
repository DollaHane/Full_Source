import { redirect } from 'next/navigation'
import { NavBar } from '../../components/NavBar'
import { UserNameForm } from '@/src/components/UserNameForm'
import { UserManager } from '@/src/components/UserManager'
import { authOptions, getAuthSession } from '@/src/lib/auth'

export const metadata = {
  title: 'Settings',
  description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
  const session = await getAuthSession()
  const user: any = session?.user

  if (!session?.user) {
    redirect(authOptions?.pages?.signIn || '/login')
  }

  return (
    <div>
      <NavBar/>
      <div className='max-w-4xl w-4/5 mx-auto py-12'>
        <div className='grid items-start gap-8'>
          <h1 className='font-bold text-3xl md:text-4xl'>Settings</h1>

          <div className='grid gap-10'>
            <UserNameForm
              user={{
                id: session.user.id,
                username: session.user.username || '',
              }}
            />
          </div>

          {user?.admin === true && (
            <div>
              <UserManager/>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}
