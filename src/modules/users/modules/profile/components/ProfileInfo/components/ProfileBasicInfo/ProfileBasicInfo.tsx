import { Spacer } from '@/components/Elements/Spacer/Spacer'
import Rating from '@/components/Rating/Rating'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import Image from 'next/legacy/image'
import React from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
import { UserProfile } from '../../../../types'
import * as Styled from './styles'

type Props = {
  user: UserProfile
}

function ProfileBasicInfo({ user }: Props) {
  const Avatar = () => {
    const url =
      user?.picture?.thumbnails?.[150] ||
      '/assets/images/profile-placeholder.jpeg'
    return (
      <Image
        loader={s3ImageLoader}
        alt="profile-image"
        layout="fill"
        src={url}
      />
    )
  }

  return (
    <Styled.Wrapper>
      <Styled.AvatarWrapper>
        <Avatar />
      </Styled.AvatarWrapper>
      <Styled.InfoWrapper>
        <Title variant="m">{user.name}</Title>
        <Spacer variant="s" />
        <Text color="disabled" variant="s">
          @{user.username}
        </Text>
        <Spacer variant="s" />
        <Rating rating={user.rating.rating} count={user.rating.count} />
      </Styled.InfoWrapper>
    </Styled.Wrapper>
  )
}

export default ProfileBasicInfo
