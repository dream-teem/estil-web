import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { UserPreview } from '@/modules/users/types'
import Image from 'next/legacy/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
import * as Styled from './styles'

type Props = {
  user: UserPreview
}

function FollowingListItem({ user }: Props) {
  const router = useRouter()

  return (
    <Styled.FollowingListItemWrapper
      onClick={() => router.push(`/profile/${user.username}`)}
    >
      <Styled.UserImageWrapper>
        <Image
          alt="user-image"
          layout="fill"
          loader={s3ImageLoader}
          src={
            user.picture
              ? user.picture.thumbnails[150]
              : '/assets/images/profile-placeholder.jpeg'
          }
        />
      </Styled.UserImageWrapper>
      <Styled.UserDetailsWrapper>
        <Link href={`/profile/${user.username}`}>
          <Title>{user.username}</Title>
        </Link>
        <Text color="disabled">Edinburgh, United Kingdom</Text>
      </Styled.UserDetailsWrapper>
    </Styled.FollowingListItemWrapper>
  )
}

export default FollowingListItem
