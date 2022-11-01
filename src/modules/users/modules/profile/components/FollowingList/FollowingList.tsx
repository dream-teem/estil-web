import { UserPreview } from '@/modules/users/types'
import React from 'react'
import FollowingListItem from './components/FollowingListItem/FollowingListItem'
import * as Styled from './styles'

type Props = {
  users: UserPreview[]
}

function FollowingList({ users: followings }: Props) {
  return (
    <Styled.FollowingListWrapper>
      {followings.map(f => (
        <FollowingListItem key={f.id} user={f} />
      ))}
    </Styled.FollowingListWrapper>
  )
}

export default FollowingList
