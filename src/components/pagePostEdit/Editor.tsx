"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { docList, npmList } from "@/src/lib/postSelections"
import { uploadFiles } from "@/src/lib/uploadthing"
import { PostCreationRequest, PostValidator } from "@/src/lib/validators/post"
import EditorJS from "@editorjs/editorjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useForm } from "react-hook-form"
import TextareaAutosize from "react-textarea-autosize"
import { z } from "zod"

import { toast } from "../../hooks/use-toast"
import "../../styles/editor.css"

type FormData = z.infer<typeof PostValidator>

type UploadOptions = {
  endpoint: "imageUploader"
  onUploadProgress?: ({ file, progress }: { file: string; progress: number }) => void
  input?: any
  files: File[]
};

interface EditPageProps {
  params: {
    postId: string
  }
  post: any
}

export default function Editor({ post, params }: EditPageProps) {
  // Toggle Category Selection
  const [postType, setPostType] = useState<string>(post.type)

  const postId = params.postId

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      type: post.type,
      categorydoc: post.categorydoc,
      categorynpm: post.categorynpm,
      index: post.index,
      title: post.title,
      description: post.description,
      content: post.content,
    },
  })

  // Share the ref between Focus and useForm
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const { ref: titleRef, ...rest } = register("title")

  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { mutate: updatePost } = useMutation({
    // PAYLOAD
    mutationFn: async ({
      type,
      categorydoc,
      categorynpm,
      index,
      title,
      description,
      content,
    }: PostCreationRequest) => {
      const payload: PostCreationRequest = {
        type,
        categorydoc,
        categorynpm,
        index,
        title,
        description,
        content,
      }
      const { data } = await axios.patch(`/api/post/update/${postId}`, payload)

      return data
    },

    // ERROR
    onError: () => {
      return toast({
        title: "Something went wrong.",
        description: "Your post was not published. Please try again.",
        variant: "destructive",
      })
    },

    // SUCCESS
    onSuccess: () => {
      router.push(`/fs/post/${postId}`)

      router.refresh()

      return toast({
        description: "Your post has been published.",
      })
    },
  })

  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import("@editorjs/editorjs")).default
    const Header = (await import("@editorjs/header")).default
    const Embed = (await import("@editorjs/embed")).default
    const Table = (await import("@editorjs/table")).default
    const List = (await import("@editorjs/list")).default
    const Code = (await import("@editorjs/code")).default
    const LinkTool = (await import("@editorjs/link")).default
    const InlineCode = (await import("@editorjs/inline-code")).default
    const ImageTool = (await import("@editorjs/image")).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: "editor",
        onReady() {
          ref.current = editor
        },
        placeholder: "Type here to write your post...",
        inlineToolbar: true,
        data: { blocks: post.content.blocks },
        tools: {
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3],
              defaultLevel: 1
            }
          },
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: "/api/link",
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  // upload to uploadthing
                  const [res] = await uploadFiles({
                    endpoint: "imageUploader",
                    files: [file],
                  })

                  return {
                    success: 1,
                    file: {
                      url: res.fileUrl,
                    },
                  }
                },
              },
            },
          },
          list: List,
          code: Code,
          inlineCode: InlineCode,
          table: Table,
          embed: Embed,
        },
      })
    }
  }, [post.content.blocks])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: "Something went wrong.",
          description: (value as { message: string }).message,
          variant: "destructive",
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMounted(true)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      await initializeEditor()

      setTimeout(() => {
        _titleRef?.current?.focus()
      }, 0)
    }

    if (isMounted) {
      init()

      return () => {
        ref.current?.destroy()
        ref.current = undefined
      }
    }
  }, [isMounted, initializeEditor])

  async function onSubmit(data: FormData) {
    const blocks = await ref.current?.save()

    const payload: PostCreationRequest = {
      type: data.type,
      categorydoc: data.categorydoc,
      categorynpm: data.categorynpm,
      index: data.index,
      title: data.title,
      description: data.description,
      content: blocks,
    }
    console.log("Payload:", payload)
    updatePost(payload)
  }

  if (!isMounted) {
    return null
  }

  const numberOptions = []
  for (let i = 0; i <= 100; i++) {
    numberOptions.push(i)
  }

  return (
    <div className="w-full rounded-lg bg-background p-4">
      <form
        id="workflow-update-form"
        className="w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="prose prose-stone dark:prose-invert">
          {/* TITLE */}
          <TextareaAutosize
            ref={(event) => {
              titleRef(event) // @ts-ignore
              _titleRef.current = event
            }}
            {...rest}
            placeholder="Title"
            className="w-full resize-none appearance-none overflow-hidden bg-transparent text-2xl md:text-5xl font-bold focus:outline-none"
          />

          <hr className="w-full" />

          {/* Description */}
          <TextareaAutosize
            {...register("description")}
            placeholder="Description"
            className="my-5 w-full resize-none appearance-none overflow-hidden bg-transparent text-base md:text-xl focus:outline-none"
          />

          <hr className="w-full" />

          <div className="mt-5 flex flex-row gap-5">
            <label className="text-sm md:text-base">
              <input
                className="mx-2 accent-rose-500"
                type="radio"
                value="Documentation"
                checked={postType === "Documentation"}
                onChange={(event) => setPostType(event.target.value)}
              />
              Documentation
            </label>
            <label className="text-sm md:text-base">
              <input
                className="mx-2 accent-rose-500"
                type="radio"
                value="NPM Link"
                checked={postType === "NPM Link"}
                onChange={(event) => setPostType(event.target.value)}
              />
              NPM Link
            </label>
          </div>

          {/* OPTIONS SELECTION */}
          {postType === "Documentation" ? (
            <div className="my-5 flex w-full flex-wrap gap-10 text-sm">
              {/* DOC TYPE */}
              <div>
                <p className="mb-2">Select Type:</p>
                <select
                  className="h-8 w-48 rounded bg-secondary p-1 outline-none"
                  {...register("type")}
                >
                  <option value="Documentation">Documentation</option>
                </select>
              </div>

              {/* DOCS CATEGORY */}
              <div>
                <p className="mb-2">Select Document Category:</p>
                <select
                  {...register("categorydoc")}
                  className="h-8 w-48 rounded bg-secondary  p-1 outline-none"
                >
                  {docList.map((item: string) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* INDEX */}
              <div>
                <p className="mb-2">Select Index:</p>
                <select
                  {...register("index", { valueAsNumber: true })}
                  className="h-8 w-16 rounded bg-secondary p-1 text-center outline-none"
                >
                  {numberOptions.map((item: number) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          ) : (
            <div className="my-5 flex w-full flex-wrap gap-10 text-sm">
              {/* NPM TYPE */}
              <div>
                <p className="mb-2">Select Type:</p>
                <select
                  className="h-8 w-48 rounded bg-secondary p-1 outline-none"
                  {...register("type")}
                >
                  <option value="NPM Link">NPM Link</option>
                </select>
              </div>

              {/* NPM CATEGORY */}
              <div>
                <p className="mb-2">Select NPM Category:</p>
                <select
                  {...register("categorynpm")}
                  className="h-8 w-48 rounded bg-secondary  p-1 outline-none"
                >
                  {npmList.map((item: string) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>

              {/* INDEX */}
              <div>
                <p className="mb-2 text-sm md:text-base">Select Index:</p>
                <select
                  {...register("index", { valueAsNumber: true })}
                  className="h-8 w-16 rounded bg-secondary p-1 text-center outline-none"
                >
                  {numberOptions.map((item: number) => {
                    return (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    )
                  })}
                </select>
              </div>
            </div>
          )}

          <hr />

          {/* EDITOR AREA */}
          <div
            id="editor"
            className="flex min-h-[200px] w-full justify-start text-sm md:text-base"
          />

          <p className="text-sm text-gray-500">
            Use{" "}
            <kbd className="rounded-md border bg-muted px-1 text-xs uppercase">
              Tab
            </kbd>{" "}
            to open the command menu.
          </p>
        </div>
      </form>
    </div>
  )
}
