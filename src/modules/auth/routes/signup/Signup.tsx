import Logo from '@/components/Layout/components/Logo/Logo'
import React from 'react'
import SignupForm from './components/SignupForm/SignupForm'
import * as Styled from './styles'

function Signup() {
  return (
    <Styled.SignupWrapper>
      <Styled.SignupInnerWrapper>
        <Logo className="logo" />
        <SignupForm />
      </Styled.SignupInnerWrapper>
    </Styled.SignupWrapper>
  )
}

export default Signup
