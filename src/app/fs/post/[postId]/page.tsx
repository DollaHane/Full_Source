import { Suspense } from "react"
import { notFound } from "next/navigation"
import { Button, buttonVariants } from "@/src/components/components-ui/Button"
import CommentsSection from "@/src/components/pagePost/CommentsSection"
import EditorOutput from "@/src/components/pagePost/EditorOutput"
import PostVoteServer from "@/src/components/post-vote/PostVoteServer"
import { db } from "@/src/lib/db"
import { redis } from "@/src/lib/redis"
import { formatTimeToNow } from "@/src/lib/utils"
import { CachedPost } from "@/src/types/redis"
import { Post, User, Vote } from "@prisma/client"
import { ArrowBigDown, ArrowBigUp, Loader2 } from "lucide-react"

interface PostPageProps {
  params: {
    postId: string
  }
}

export const dynamic = "force-dynamic"
export const fetchCache = "force-no-store"

export default async function PostPageContent({ params }: PostPageProps) {
  const cachedPost = (await redis.hgetall(
    `post:${params.postId}`
  )) as CachedPost

  let post: (Post & { votes: Vote[]; author: User }) | null = null

  if (!cachedPost) {
    post = await db.post.findFirst({
      where: {
        id: params.postId,
      },
      include: {
        votes: true,
        author: true,
      },
    })
  }

  if (!post && !cachedPost) return notFound()

  const posts = await db.post.findMany({
    orderBy: {
      index: "asc",
    },
    include: {
      votes: true,
      author: true,
      comments: true,
    },
  })

  return (
    <div>
      <div className="flex flex-row">
        <div className="mx-auto mb-44 mt-10 flex h-full w-9/12 flex-col items-center justify-between sm:flex-row sm:items-start">
          <Suspense fallback={<PostVoteShell />}></Suspense>

          <div className="w-full flex-1">
            <div className="flex w-full justify-between">
              <h1 className="py-2 font-prompt text-xl font-semibold leading-6 text-cyan-500 md:text-2xl">
                {post?.title ?? cachedPost.title}
              </h1>

              <a href={`/fs/post/edit/${params.postId}`}>
                <Button
                  type="submit"
                  className="w-20 rounded-full border-cyan-500 bg-capecod-600 text-zinc-50 shadow-lg hover:border hover:bg-background hover:text-primary"
                  form="workflow-update-form"
                >
                  Edit
                </Button>
              </a>
            </div>

            <h1 className="mt-5 py-2 font-prompt text-sm leading-6 text-primary md:text-xl">
              {post?.description ?? cachedPost.description}
            </h1>

            <p className="mb-5 mt-1 max-h-40 truncate text-xs text-capecod-500">
              Last updated by{" "}
              {post?.author.username ?? cachedPost.authorUsername}{" "}
              {formatTimeToNow(
                new Date(post?.updatedAt ?? cachedPost.updatedAt)
              )}
            </p>
            <hr className="mb-10" />

            <EditorOutput content={post?.content ?? cachedPost.content} />

            <div className="mt-5 flex flex-col gap-2">
              {/* @ts-expect-error Server Component */}
              <PostVoteServer
                postId={post?.id ?? cachedPost.id}
                getData={async () => {
                  return await db.post.findUnique({
                    where: {
                      id: params.postId,
                    },
                    include: {
                      votes: true,
                    },
                  })
                }}
              />
            </div>

            <Suspense
              fallback={
                <Loader2 className="h-5 w-5 animate-spin text-capecod-300" />
              }
            >
              {/* @ts-expect-error Server Component */}
              <CommentsSection postId={params.postId ?? cachedPost.id} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function PostVoteShell() {
  return (
    <div className="flex w-20 flex-col items-center pr-6">
      {/* upvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="py-2 text-center text-sm font-medium text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ variant: "ghost" })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  )
}
