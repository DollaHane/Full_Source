"use client"

import { FC, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useOnClickOutside } from "@/src/hooks/use-on-click-outside"
import { formatTimeToNow } from "@/src/lib/utils"
import { CommentRequest } from "@/src/lib/validators/comment"
import { Comment, CommentVote, User } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { MessageSquare } from "lucide-react"
import { useSession } from "next-auth/react"

import { toast } from "../../hooks/use-toast"
import { Button } from "../components-ui/Button"
import { Label } from "../components-ui/Label"
import { Textarea } from "../components-ui/Textarea"
import { UserAvatar } from "../components-ui/UserAvatar"
import CommentVotes from "./CommentVotes"

type ExtendedComment = Comment & {
  votes: CommentVote[]
  author: User
}

interface PostCommentProps {
  comment: ExtendedComment
  votesAmt: number
  currentVote: CommentVote | undefined
  postId: string
}

export default function PostComment({
  comment,
  votesAmt,
  currentVote,
  postId,
}: PostCommentProps) {
  const { data: session } = useSession()
  const [isReplying, setIsReplying] = useState<boolean>(false)
  const commentRef = useRef<HTMLDivElement>(null)
  const [input, setInput] = useState<string>(`@${comment.author.username} `)
  const router = useRouter()
  useOnClickOutside(commentRef, () => {
    setIsReplying(false)
  })

  const { mutate: postComment, isLoading } = useMutation({
    mutationFn: async ({ postId, text, replyToId }: CommentRequest) => {
      const payload: CommentRequest = { postId, text, replyToId }

      const { data } = await axios.patch(`/api/post/comment/`, payload)
      return data
    },

    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Comment wasn't created successfully. Please try again.",
        variant: "destructive",
      })
    },
    onSuccess: () => {
      router.refresh()
      setIsReplying(false)
    },
  })

  return (
    <div ref={commentRef} className="flex flex-col">
      <div className="flex items-center">
        <UserAvatar
          user={{
            name: comment.author.name || null,
            image: comment.author.image || null,
          }}
          className="h-6 w-6"
        />
        <div className="ml-2 flex items-center gap-x-2">
          <p className="text-sm font-medium text-cyan-500">
            {comment.author.username}
          </p>

          <p className="max-h-40 truncate text-xs text-capecod-500">
            {formatTimeToNow(new Date(comment.createdAt))}
          </p>
        </div>
      </div>

      <p className="mb-5 mt-3 text-sm text-primary">{comment.text}</p>

      <div className="flex items-center gap-2">
        <CommentVotes
          commentId={comment.id}
          votesAmt={votesAmt}
          currentVote={currentVote}
        />

        <Button
          className="text-capecod-500 hover:bg-transparent hover:text-green-500"
          onClick={() => {
            if (!session) return router.push("/sign-in")
            setIsReplying(true)
          }}
          variant="ghost"
          size="xs"
        >
          <MessageSquare className="mr-1.5 h-4 w-4  text-capecod-500" />
          Reply
        </Button>
      </div>

      {isReplying ? (
        <div className="grid w-full gap-1.5">
          <Label htmlFor="comment" className="text-capecod-500">
            Your comment
          </Label>
          <div className="mt-2">
            <Textarea
              className=""
              onFocus={(event) =>
                event.currentTarget.setSelectionRange(
                  event.currentTarget.value.length,
                  event.currentTarget.value.length
                )
              }
              autoFocus
              id="comment"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              rows={1}
              placeholder="What are your thoughts?"
            />

            <div className="mt-5 flex justify-end gap-2">
              <Button
                className="w-20 rounded-full border-rose-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-rose-200 hover:text-zinc-800"
                tabIndex={-1}
                variant="subtle"
                onClick={() => setIsReplying(false)}
              >
                Cancel
              </Button>
              <Button
                className="w-20 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
                isLoading={isLoading}
                onClick={() => {
                  if (!input) return
                  postComment({
                    postId,
                    text: input,
                    replyToId: comment.replyToId ?? comment.id, // default to top-level comment
                  })
                }}
              >
                Reply
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      <hr className="mt-3 w-full text-capecod-500" />
    </div>
  )
}
