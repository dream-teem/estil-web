import { BaseEntity } from '@/types/entities'
import { UserProfile } from './modules/profile/types'

export type UserPictureThumbnails = Record<'75' | '150' | '428', string>

export type UserPicture = {
  original: string
  thumbnails: UserPictureThumbnails
}

export type User = BaseEntity & {
  id: number
  email: string
  username: string
  name: string | null
  phone: string
  description: string | null
  picture: UserPicture | null
  cityId: number | null
}

export type UsersState = {
  userProfiles: Record<string, UserProfile>
}

export type UserPreview = Pick<User, 'id' | 'picture' | 'username' | 'name'>
