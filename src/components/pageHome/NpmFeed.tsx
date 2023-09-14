"use client"

import { ExtendedPost } from "@/src/types/db"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components-ui/Accordion"
import NpmComponent from "./NpmComponent"

interface PostFeedProps {
  npmPosts: ExtendedPost[]
}

export default function NpmFeed({ npmPosts }: PostFeedProps) {
  return (
    <div className="z-30 mb-10 w-full rounded-lg bg-background py-5 text-primary">
      <Accordion type="single" collapsible>
        <AccordionItem value="Init">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Init Developement:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Init Developement") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="framework">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Framework:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Framework") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="lib">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Libraries:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Libraries") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="data">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Database:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Database") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="back">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Backend:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Backend") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="auth">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Authentication:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Authentication") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="state">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">State Management:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "State Management") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="forms">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Forms & Validation:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Forms & Validation") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="anime">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Animation:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Animation") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="service">
          <AccordionTrigger>
            <h1 className="hover:text-cyan-500">Services:</h1>
          </AccordionTrigger>
          <AccordionContent>
            {npmPosts?.map((post: ExtendedPost) => {
              if (post.categorynpm === "Services") {
                return <NpmComponent key={post.id} post={post} />
              }
            })}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
