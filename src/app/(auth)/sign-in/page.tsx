import { FC } from "react"
import SignIn from "@/src/components/pageSignin/SignIn"

const page: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="mx-auto mt-20 flex max-w-2xl items-center justify-center">
        <SignIn />
      </div>
    </div>
  )
}

export default page
