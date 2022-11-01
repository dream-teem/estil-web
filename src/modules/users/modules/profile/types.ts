import { User } from '../../types'

export type UserProfile = Pick<
  User,
  'username' | 'name' | 'description' | 'avatar' | 'id'
> & {
  follorwers: number
  following: number
  rating: {
    count: number
    rating: number
  }
  productCount: number
  moderator?: boolean
  isFollowed?: boolean
  lastLoggedIn: string
}
