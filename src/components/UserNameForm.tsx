"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/src/lib/utils"
import { UsernameValidator } from "@/src/lib/validators/username"
import { zodResolver } from "@hookform/resolvers/zod"
import { User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { toast } from "../hooks/use-toast"
import { Button } from "./components-ui/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./components-ui/Card"
import { Input } from "./components-ui/Input"
import { Label } from "./components-ui/Label"

interface UserNameFormProps extends React.HTMLAttributes<HTMLFormElement> {
  user: Pick<User, "id" | "username">
}

type FormData = z.infer<typeof UsernameValidator>

export function UserNameForm({ user, className, ...props }: UserNameFormProps) {
  const router = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(UsernameValidator),
    defaultValues: {
      name: user?.username || "",
    },
  })

  const { mutate: updateUsername, isLoading } = useMutation({
    mutationFn: async ({ name }: FormData) => {
      const payload: FormData = { name }

      const { data } = await axios.patch(`/api/username/`, payload)
      return data
    },
    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 409) {
          return toast({
            title: "Username already taken.",
            description: "Please choose another username.",
            variant: "destructive",
          })
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your username was not updated. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      toast({
        description: "Your username has been updated.",
      })
      router.refresh()
    },
  })

  return (
    <form
      className={cn(className)}
      onSubmit={handleSubmit((e) => updateUsername(e))}
      {...props}
    >
      <Card>
        <CardHeader>
          <CardTitle>Username</CardTitle>
          <CardDescription>
            Please enter a display name you are comfortable with.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative grid gap-1">
            <div className="absolute left-0 top-0 grid h-10 w-8 place-items-center">
              <span className="text-sm text-zinc-400"></span>
            </div>
            <Label className="sr-only" htmlFor="name">
              Name
            </Label>
            <Input
              id="name"
              className="w-[400px] bg-secondary pl-6"
              size={32}
              {...register("name")}
            />
            {errors?.name && (
              <p className="px-1 text-xs text-red-600">{errors.name.message}</p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="mt-5 w-40 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
            isLoading={isLoading}
          >
            Change name
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}
