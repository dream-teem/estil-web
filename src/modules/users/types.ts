import { BaseEntity } from '@/types/entities'
import { UserProfile } from './modules/profile/types'

export type Thumbnails = Record<'150' | '310' | '428' | '624' | '1280', string>

export type User = BaseEntity & {
  id: number
  email: string
  username: string
  name: string | null
  phone: string
  description: string | null
  avatar: Thumbnails | null
  cityId: number | null
}

export type UsersState = {
  userProfiles: Record<string, UserProfile>
}

export type UserPreview = Pick<User, 'id' | 'avatar' | 'username' | 'name'>
