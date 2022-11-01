export type BaseEntity = {
  id: number
  createdAt: string
  updatedAt: string
}

export type City = BaseEntity & {
  slug: string
  name: string
}
