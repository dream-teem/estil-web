import React from 'react'
import * as Styled from './styles'

function FillContainerLoader() {
  return (
    <Styled.LoaderWrapper>
      <Styled.LoadingSpinner></Styled.LoadingSpinner>
    </Styled.LoaderWrapper>
  )
}

export default FillContainerLoader
