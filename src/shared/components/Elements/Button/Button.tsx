import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { useAuth } from '@/hooks/useAuth'
import { useRouter } from 'next/router'
import React, { useCallback } from 'react'
import * as Styled from './styles'

type Props = {
  children?: React.ReactNode
  color?: 'danger' | 'primary' | 'secondary' | 'disabled'
  isLoading?: boolean
  type?: 'submit' | 'button'
  fullWidth?: boolean
  onClick?: () => void
  disabled?: boolean
  auth?: boolean
  variant?: 'normal' | 'outline'
  style?: React.CSSProperties
  className?: string
}

function Button({
  onClick,
  disabled,
  children,
  color,
  type = 'button',
  fullWidth = false,
  isLoading,
  auth,
  variant,
  style,
  className
}: Props) {
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
    if (auth && !isLoggedIn) router.push(getRedirectPage())
    else onClick?.()
  }

  return (
    <Styled.Button
      className={className}
      variant={variant}
      style={style}
      onClick={handleClick}
      color={color}
      fullWidth={fullWidth}
      type={type}
      disabled={disabled}
    >
      {isLoading ? <FillContainerLoader /> : children}
    </Styled.Button>
  )
}

export default Button
