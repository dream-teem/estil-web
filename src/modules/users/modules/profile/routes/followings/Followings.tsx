import { Title } from '@/components/Typography/Title'
import { UserPreview } from '@/modules/users/types'
import React from 'react'
import { FollowingContainer } from '../../components/Container/Container'
import FollowingList from '../../components/FollowingList/FollowingList'

type Props = {
  followings: UserPreview[]
}

function Followings({ followings }: Props) {
  return (
    <FollowingContainer>
      <Title>Followers</Title>
      <FollowingList users={followings} />
    </FollowingContainer>
  )
}

export default Followings
