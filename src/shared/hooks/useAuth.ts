import usersApi from '@/services/users/api'
import { useTypedSelector } from '@/store/store'

export const useAuth = () => {
  const { isLoggedIn, user: authUser } = useTypedSelector(
    state => state.authSlice
  )

  const { data: user } = usersApi.endpoints.getProfile.useQuery(null, {
    skip: !isLoggedIn
  })

  return { isLoggedIn, user, authUser }
}
