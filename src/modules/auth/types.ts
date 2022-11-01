export type AuthState = {
  isLoggedIn?: boolean
  user?: AuthUser
  accessToken?: string | null
}

export type AuthUser = {
  username: string
}
