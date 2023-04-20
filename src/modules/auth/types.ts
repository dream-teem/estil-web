export type AuthState = {
  isLoggedIn?: boolean
  user?: AuthUser
  token: string | null
}

export type AuthUser = {
  id: number
  username: string
  token: string
}
