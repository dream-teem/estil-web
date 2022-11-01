import { useTypedSelector } from '@/store/store'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import FillContainerLoader from '../Loader/FillContainerLoader/FillContainerLoader'
import { UserRole } from './types'

type AuthProps = {
  children: JSX.Element
  roles?: UserRole[]
  redirect?: string
}

function Auth({ children, redirect }: AuthProps) {
  const { isLoggedIn } = useTypedSelector(state => state.authSlice)
  const router = useRouter()

  const getRedirectPage = () => {
    // redirect back to page where it came from
    const redirectPage = router.asPath

    return {
      pathname: redirect || '/auth/login',
      query: {
        redirectPage
      }
    }
  }

  useEffect(() => {
    if (isLoggedIn) return
    router.push(getRedirectPage())
  }, [isLoggedIn])

  if (isLoggedIn) {
    return children
  }

  return <FillContainerLoader />
}

export default Auth
