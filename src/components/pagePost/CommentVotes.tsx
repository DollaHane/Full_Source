"use client"

import { FC, useState } from "react"
import { useCustomToasts } from "@/src/hooks/use-custom-toasts"
import { toast } from "@/src/hooks/use-toast"
import { cn } from "@/src/lib/utils"
import { CommentVoteRequest } from "@/src/lib/validators/vote"
import { usePrevious } from "@mantine/hooks"
import { CommentVote, VoteType } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"

import { Button } from "../components-ui/Button"

interface CommentVotesProps {
  commentId: string
  votesAmt: number
  currentVote?: PartialVote
}

type PartialVote = Pick<CommentVote, "type">

const CommentVotes: FC<CommentVotesProps> = ({
  commentId,
  votesAmt: _votesAmt,
  currentVote: _currentVote,
}) => {
  const { loginToast } = useCustomToasts()
  const [votesAmt, setVotesAmt] = useState<number>(_votesAmt)
  const [currentVote, setCurrentVote] = useState<PartialVote | undefined>(
    _currentVote
  )
  const prevVote = usePrevious(currentVote)

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: CommentVoteRequest = {
        voteType: type,
        commentId,
      }

      await axios.patch("/api/post/comment/vote", payload)
    },
    onError: (err, voteType) => {
      if (voteType === "UP") setVotesAmt((prev) => prev - 1)
      else setVotesAmt((prev) => prev + 1)

      // reset current vote
      setCurrentVote(prevVote)

      if (err instanceof AxiosError) {
        if (err.response?.status === 401) {
          return loginToast()
        }
      }

      return toast({
        title: "Something went wrong.",
        description: "Your vote was not registered. Please try again.",
        variant: "destructive",
      })
    },
    onMutate: (type: VoteType) => {
      if (currentVote?.type === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined)
        if (type === "UP") setVotesAmt((prev) => prev - 1)
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1)
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote({ type })
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
      }
    },
  })

  return (
    <div className="flex gap-1">
      {/* upvote */}
      <Button
        className="hover:bg-transparent"
        onClick={() => vote("UP")}
        size="xs"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-4 w-4 text-capecod-500 hover:text-green-500", {
            "fill-green-500 text-green-500": currentVote?.type === "UP",
          })}
        />
      </Button>

      {/* score */}
      <p className="px-1 py-2 text-center text-xs font-medium text-capecod-500">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        onClick={() => vote("DOWN")}
        size="xs"
        className={cn("hover:bg-transparent", {
          "text-emerald-500": currentVote?.type === "DOWN",
        })}
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigDown
          className={cn("h-4 w-4 text-capecod-500 hover:text-rose-500", {
            "fill-rose-500 text-rose-500": currentVote?.type === "DOWN",
          })}
        />
      </Button>
    </div>
  )
}

export default CommentVotes
