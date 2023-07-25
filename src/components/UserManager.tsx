'use client'

import React, { useState, useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { AuthChangeValidator } from '../lib/validators/admin'
import { AuthChangeRequest } from '../lib/validators/admin'
import { Button } from './components-ui/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './components-ui/Card'
import { toast } from '../hooks/use-toast'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'

type FormData = z.infer<typeof AuthChangeValidator>

export function UserManager() {
  
  const router = useRouter()

  // GET USERS
  const [users, setUsers] = useState<any>([])

  const getUsers = async () => {
    try {
      const userData = await axios.get('/api/getusers')
      const userList = userData.data
      setUsers(userList)
    } catch (error) {
      return { error: 'Could not find any users' }
    }
  }

  useEffect(() => {
    getUsers()
  }, [])

  // UPDATE USERS
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(AuthChangeValidator),
    defaultValues: {
      admin: users.admin,
    },
  })

  const { mutate: updateUserAuth, isLoading } = useMutation({
    mutationFn: async ({ admin }: FormData) => {
      const payload: FormData = { admin }
      console.log('Payload: Axios', payload)

      const { data } = await axios.patch(`/api/useradmin/`, payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: 'Could not update user.',
            description: 'Could not update users authorisation status, please try again later.',
            variant: 'destructive',
          })
        }
      }
      return toast({
        title: 'Something went wrong.',
        description: 'The user authority was not updated. Please try again.',
        variant: 'destructive',
      })
    },
    onSuccess: () => {
      toast({
        description: 'The user authority has been updated.',
      })
      router.refresh()
    },
  })

  return (
    <form id='auth-update-form' className='w-full' onSubmit={handleSubmit((event) => updateUserAuth(event))}>
      <Card>

        <CardHeader>
          <CardTitle>User List</CardTitle>
          <CardDescription className='flex-wrap text-xs md:text-base'>
            To update a users authorisation, please select their authorisation status.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className='relative grid gap-1'>

              <div className='w-auto grid grid-cols-3'>
                <div className='font-bold text-xs md:text-base'>Username:</div>
                <div className='font-bold text-xs md:text-base'>Email:</div>
                <div className='font-bold text-xs md:text-base'>Admin Authorisation:</div>
              </div>

              <hr className='mb-5'/>

              {users.length >= 0 && users?.map(( user: any ) => {
                return (
                  <div className='grid grid-cols-3'>
                    <p className='mb-2 text-xs md:text-base' key={user.username}>
                      {user.username}
                    </p>
                    <p className='mb-2 text-xs md:text-base truncate' key={user.email}>
                      {user.email}
                    </p>
                    <select 
                      {...register("admin")}
                      className='w-20 h-8 p-1 text-xs md:text-base bg-secondary outline-none rounded'
                      defaultValue={user.admin} 
                      key={user.id}
                    >
                      <option value={"true"}>
                        True
                      </option>
                      <option value={"false"}>
                        False
                      </option>
                    </select>
                  </div>
                )
              })}

              {errors?.admin && (
                <p className='px-1 text-xs text-red-600'>{errors.admin.message}</p>
              )}
          </div>
        </CardContent>

        <CardFooter>
          <Button 
            className='w-40 mt-5 bg-capecod-600 hover:bg-background text-zinc-50 hover:text-primary shadow-lg rounded-full hover:border border-cyan-500'
            isLoading={isLoading}
          >
            Change Authorisation
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

