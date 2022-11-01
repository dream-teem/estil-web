import Button from '@/components/Elements/Button/Button'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import usersApi from '@/services/users/api'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { UserProfile } from '../../../../types'
import * as Styled from './styles'

type Props = {
  user: UserProfile
}

function ProfileFollowingInfo({ user }: Props) {
  const { t } = useTranslation('profile')
  const [toggle, { isLoading }] = usersApi.endpoints.toggleFollow.useMutation()
  const router = useRouter()

  const ModeratorButton = () => {
    return (
      <Link href={'/products/new'}>
        <Styled.FollowButton>{t('sellItem')}</Styled.FollowButton>
      </Link>
    )
  }

  const FollowingButton = () => {
    return (
      <Button
        isLoading={isLoading}
        auth={true}
        color="secondary"
        onClick={() => toggle(user)}
      >
        {user.isFollowed ? t('unfollow') : t('follow')}
      </Button>
    )
  }
  return (
    <Styled.ProfileFollowingInfoWrapper>
      <Styled.FollowingInfoItem
        onClick={() => router.push(`/profile/${user.username}/followers`)}
      >
        <Title>{user.follorwers}</Title>
        <Text>{t('followers')}</Text>
      </Styled.FollowingInfoItem>
      <Styled.FollowingInfoItem
        onClick={() => router.push(`/profile/${user.username}/followings`)}
      >
        <Title>{user.following}</Title>
        <Text>{t('following')}</Text>
      </Styled.FollowingInfoItem>
      <Styled.FollowingInfoItem>
        {user.moderator ? <ModeratorButton /> : <FollowingButton />}
      </Styled.FollowingInfoItem>
    </Styled.ProfileFollowingInfoWrapper>
  )
}

export default ProfileFollowingInfo
