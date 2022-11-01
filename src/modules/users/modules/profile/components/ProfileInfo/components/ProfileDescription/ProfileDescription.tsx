import { Text } from '@/components/Typography/Text'
import React from 'react'
import * as Styled from './styles'

type Props = {
  description: string | null
}

function ProfileDescription({ description }: Props) {
  return (
    <Styled.ProfileDescriptionWrapper>
      <Text>{description}</Text>
    </Styled.ProfileDescriptionWrapper>
  )
}

export default ProfileDescription
