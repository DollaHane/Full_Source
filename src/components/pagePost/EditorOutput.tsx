"use client"
import dynamic from "next/dynamic"
import CustomCodeRenderer from "../renderers/CustomCodeRenderer"
import CustomImageRenderer from "../renderers/CustomImageRenderer"
import CustomHeaderRenderer from "../renderers/CustomHeaderRenderer"

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
}

const style = {
  paragraph: {
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    marginTop: "2rem",
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
