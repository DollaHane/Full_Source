"use client"

import { FC, useState } from "react"
import { useRouter } from "next/navigation"
import { useCustomToasts } from "@/src/hooks/use-custom-toasts"
import { toast } from "@/src/hooks/use-toast"
import { CommentRequest } from "@/src/lib/validators/comment"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"

import { Button } from "../components-ui/Button"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"

interface CreateCommentProps {
  postId: string
  replyToId?: string
}

export default function CreateComment({
  postId,
  replyToId,
}: CreateCommentProps) {
  const [input, setInput] = useState<string>("")
  const router = useRouter()
  const { loginToast } = useCustomToasts()

  const { mutate: comment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId }

      const { data } = await axios.patch(`/api/post/comment/`, payload)
      return data
    },

    onError: (err) => {
      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created successfully. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      router.refresh()
      setInput("")
    },
  })

  return (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="comment" className="text-capecod-500">
        Your comment
      </Label>
      <div className="mt-2">
        <Textarea
          className="text-primary outline-none"
          id="comment"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          rows={1}
          placeholder="What are your thoughts?"
        />

        <div className="mt-5 flex justify-start">
          <Button
            className="w-20 rounded-full border-cyan-500 bg-zinc-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
            isLoading={isLoading}
            disabled={input.length === 0}
            onClick={() => comment({ postId, text: input, replyToId })}
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  )
}
