import { UserProfile } from '@/modules/users/modules/profile/types'
import { User } from '@/modules/users/types'

export type GetUsersResponse = User[]

export type ToggleFollowResponse = {}

export type ToggleFollowRequest = UserProfile

export type GetUserProfileResponse = UserProfile

export type GetUserProfileRequest = {
  username: string
}

export type UpdateUserProfileRequest = Pick<
  User,
  'id' | 'picture' | 'name' | 'description' | 'cityId'
>

export type GetUserResponse = Pick<
  User,
  | 'id'
  | 'picture'
  | 'name'
  | 'description'
  | 'username'
  | 'email'
  | 'createdAt'
  | 'updatedAt'
  | 'phone'
  | 'username'
> & {
  cityId: number
}
