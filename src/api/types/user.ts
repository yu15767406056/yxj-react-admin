type userRouter = {
  title: string
  icon?: string
  path?: string
  type: 0 | 1 | 2
  component?: string
  childern?: userRouter[]
  id: number
}

export type { userRouter }
