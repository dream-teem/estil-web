import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import * as Styled from './styles'

type Props = {
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

function AuthWrapper({ onClick, children, className }: Props) {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  const getRedirectPage = useCallback(() => {
    // redirect back to page where it came from
    const redirectPage = router.asPath

    return {
      pathname: '/auth/login',
      query: {
        redirectPage
      }
    }
  }, [router])

  const handleClick = () => {
    if (!isLoggedIn) router.push(getRedirectPage())
    else onClick?.()
  }

  return (
    <Styled.AuthWrapper className={className} onClick={handleClick}>
      {children}
    </Styled.AuthWrapper>
  )
}

export default AuthWrapper
