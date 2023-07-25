import { z } from 'zod'

export const AuthChangeValidator = z.object({
  admin: z.string(),
  username: z.string(),
})

export type AuthChangeRequest = z.infer<typeof AuthChangeValidator>
