"use client"

import dynamic from "next/dynamic"

import CustomCodeRenderer from "../renderers/CustomCodeRenderer"
import CustomHeaderRenderer from "../renderers/CustomHeaderRenderer"
import CustomImageRenderer from "../renderers/CustomImageRenderer"
import CustomLinkRenderer from "../renderers/CustomLinkRenderer"

const Output = dynamic(
  async () => (await import("editorjs-react-renderer")).default,
  { ssr: false }
)

interface EditorOutputProps {
  content: any
}

const renderers = {
  header: CustomHeaderRenderer,
  image: CustomImageRenderer,
  code: CustomCodeRenderer,
  linktool: CustomLinkRenderer,
}

const style = {
  paragraph: {
    fontSize: "1rem",
    lineHeight: "1.25rem",
    marginTop: "1rem",
    marginBottom: "0.5rem",
  },
}

export default function EditorOutput({ content }: EditorOutputProps) {
  return (
    <Output
      style={style}
      className="text-sm"
      renderers={renderers}
      data={content}
    />
  )
}
