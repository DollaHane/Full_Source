'use client'
import EditorJS from '@editorjs/editorjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { z } from 'zod'

import { toast } from '../../hooks/use-toast'
import { uploadFiles } from '@/src/lib/uploadthing'
import { PostCreationRequest, PostValidator } from '@/src/lib/validators/post'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { categoryList } from '@/src/lib/postSelections'
import { typeList } from '@/src/lib/postSelections'
import '../../styles/editor.css'

type FormData = z.infer<typeof PostValidator>


interface EditPageProps {
  params: {
    postId: string
  },
  post: any
}

export default function Editor({ post, params }: EditPageProps) {

  const postId = params.postId
  const type = post.type
  const category = post.category
  const index = post.index

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(PostValidator),
    defaultValues: {
      type: post.type,
      category: post.category,
      index: post.index,
      title: post.title,
      description: post.description,
      content: post.content,
    },
  })

  // Share the ref between Focus and useForm
  const ref = useRef<EditorJS>()
  const _titleRef = useRef<HTMLTextAreaElement>(null)
  const { ref: titleRef, ...rest } = register('title')
  
  const router = useRouter()
  const [isMounted, setIsMounted] = useState<boolean>(false)

  const { mutate: updatePost } = useMutation({

    // PAYLOAD
    mutationFn: async ({ type, category, index, title, description, content  }: PostCreationRequest) => {
      
      const payload: PostCreationRequest = { type, category, index, title, description, content }
      const { data } = await axios.patch(`/api/post/update/${postId}`, payload)
      
      console.log("Data:", data)
      return data
    },


    // ERROR
    onError: () => {
      return toast({
        title: 'Something went wrong.',
        description: 'Your post was not published. Please try again.',
        variant: 'destructive',
      })
    },

    // SUCCESS
    onSuccess: () => {
      router.push(`/post/${postId}`)

      router.refresh()

      return toast({
        description: 'Your post has been published.',
      })
    },
  })


  const initializeEditor = useCallback(async () => {
    const EditorJS = (await import('@editorjs/editorjs')).default
    const Header = (await import('@editorjs/header')).default
    const Embed = (await import('@editorjs/embed')).default
    const Table = (await import('@editorjs/table')).default
    const List = (await import('@editorjs/list')).default
    const Code = (await import('@editorjs/code')).default
    const LinkTool = (await import('@editorjs/link')).default
    const InlineCode = (await import('@editorjs/inline-code')).default
    const ImageTool = (await import('@editorjs/image')).default

    if (!ref.current) {
      const editor = new EditorJS({
        holder: 'editor',
        onReady() {
          ref.current = editor
        },
        placeholder: 'Type here to write your post...',
        inlineToolbar: true,
        data: { blocks: post.content.blocks },
        tools: {
          header: Header,
          linkTool: {
            class: LinkTool,
            config: {
              endpoint: '/api/link',
            },
          },
          image: {
            class: ImageTool,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const [res] = await uploadFiles([file], 'imageUploader')
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
  }, [])

  useEffect(() => {
    if (Object.keys(errors).length) {
      for (const [_key, value] of Object.entries(errors)) {
        value
        toast({
          title: 'Something went wrong.',
          description: (value as { message: string }).message,
          variant: 'destructive',
        })
      }
    }
  }, [errors])

  useEffect(() => {
    if (typeof window !== 'undefined') {
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
      category: data.category,
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

  const numberOptions = [];
  for (let i = 0; i <= 100; i++) {
    numberOptions.push(i);
  }

  return (
    <div className='w-full p-4 bg-background rounded-lg'>
      <form id='workflow-update-form' className='w-full' onSubmit={handleSubmit(onSubmit)}>
        
        <div className='prose prose-stone dark:prose-invert'>
          
          {/* TITLE */}
          <TextareaAutosize
            ref={(event) => {titleRef(event)// @ts-ignore
              _titleRef.current = event
            }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          />

          <hr className='w-full'/>

          {/* Description */}
          <TextareaAutosize
            {...register("description")}
            placeholder='Description'
            className='w-full my-5 resize-none appearance-none overflow-hidden bg-transparent text-xl focus:outline-none'
          />

          <hr className='w-full'/>
          
          {/* OPTIONS SELECTION */}
          <div className='flex flex-wrap w-full gap-10 my-5 text-sm'>

            {/* TYPE */}
            <div>
              <p className='mb-2'>
                Select Type:
              </p>
              <select {...register("type")} defaultValue={type} className='w-48 h-8 p-1 bg-secondary  outline-none rounded'>
                {typeList.map((item: string) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  )
                })}
              </select>
            </div>

            {/* CATEGORY */}
            <div>
              <p className='mb-2'>
                Select Category:
              </p>
              <select {...register("category")} defaultValue={category} className='w-48 h-8 p-1 bg-secondary  outline-none rounded'>
                {categoryList.map((item: string) => {
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
              <p className='mb-2'>
                Select Index:
              </p>
              <select {...register("index", {valueAsNumber: true})} defaultValue={index} className='w-16 h-8 p-1 bg-secondary  text-center outline-none rounded'>
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
          
          <hr/>
          
          {/* EDITOR AREA */}
          <div id='editor' className='flex min-h-[300px] w-full justify-start px-12' />
          
          <p className='text-sm text-gray-500'>
            Use{' '}
            <kbd className='rounded-md border bg-muted px-1 text-xs uppercase'>
              Tab
            </kbd>{' '}
            to open the command menu.
          </p>
        </div>
      
      </form>
    </div>
  )
}
