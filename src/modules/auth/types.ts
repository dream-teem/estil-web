export type AuthState = {
  isLoggedIn?: boolean
  user?: AuthUser
}

export type AuthUser = {
  id: number
  username: string
}
