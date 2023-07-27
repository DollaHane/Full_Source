"use client"

import { useEffect, useState } from "react"
import { useCustomToasts } from "@/src/hooks/use-custom-toasts"
import { cn } from "@/src/lib/utils"
import { PostVoteRequest } from "@/src/lib/validators/vote"
import { usePrevious } from "@mantine/hooks"
import { VoteType } from "@prisma/client"
import { useMutation } from "@tanstack/react-query"
import axios, { AxiosError } from "axios"
import { ArrowBigDown, ArrowBigUp } from "lucide-react"

import { toast } from "../../hooks/use-toast"
import { Button } from "../components-ui/Button"

interface PostVoteClientProps {
  postId: string
  initialVotesAmt: number
  initialVote?: VoteType | null
}

const PostVoteClient = ({
  postId,
  initialVotesAmt,
  initialVote,
}: PostVoteClientProps) => {
  const { loginToast } = useCustomToasts()
  const [votesAmt, setVotesAmt] = useState<number>(initialVotesAmt)
  const [currentVote, setCurrentVote] = useState(initialVote)
  const prevVote = usePrevious(currentVote)

  // ensure sync with server
  useEffect(() => {
    setCurrentVote(initialVote)
  }, [initialVote])

  const { mutate: vote } = useMutation({
    mutationFn: async (type: VoteType) => {
      const payload: PostVoteRequest = {
        voteType: type,
        postId: postId,
      }

      await axios.patch("/api/post/vote", payload)
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
      if (currentVote === type) {
        // User is voting the same way again, so remove their vote
        setCurrentVote(undefined)
        if (type === "UP") setVotesAmt((prev) => prev - 1)
        else if (type === "DOWN") setVotesAmt((prev) => prev + 1)
      } else {
        // User is voting in the opposite direction, so subtract 2
        setCurrentVote(type)
        if (type === "UP") setVotesAmt((prev) => prev + (currentVote ? 2 : 1))
        else if (type === "DOWN")
          setVotesAmt((prev) => prev - (currentVote ? 2 : 1))
      }
    },
  })

  return (
    <div className="flex justify-between pb-4 sm:w-28 sm:pb-0">
      {/* upvote */}
      <Button
        className="hover:bg-transparent"
        onClick={() => vote("UP")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigUp
          className={cn("h-4 w-4 text-capecod-500 hover:text-green-500", {
            "fill-green-500 text-green-500": currentVote === "UP",
          })}
        />
      </Button>

      {/* score */}
      <p className="w-5 py-2 text-center text-sm font-medium text-capecod-500">
        {votesAmt}
      </p>

      {/* downvote */}
      <Button
        className="hover:bg-transparent"
        onClick={() => vote("DOWN")}
        size="sm"
        variant="ghost"
        aria-label="upvote"
      >
        <ArrowBigDown
          className={cn("h-4 w-4 text-capecod-500 hover:text-rose-500", {
            "fill-red-500 text-red-500": currentVote === "DOWN",
          })}
        />
      </Button>
    </div>
  )
}

export default PostVoteClient
