import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { useDropzone } from '@/modules/products/components/ProductForm/components/ImageForm/components/ImageDropzone/hooks/useDropzone'
import { UserPicture } from '@/modules/users/types'
import usersApi from '@/services/users/api'
import { GetUserResponse } from '@/services/users/types'
import { useTranslation } from 'next-i18next'
import Image from 'next/legacy/image'
import React from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
import * as Styled from './styles'

type Props = {
  avatar?: UserPicture | null
  user: GetUserResponse
  onChange: (image: UserPicture) => void
}

function Avatar({ avatar, onChange, user }: Props) {
  const { t } = useTranslation('profile')

  const [uploadImage, { isLoading }] =
    usersApi.endpoints.uploadImage.useMutation()

  const saveImage = async (files: File[]) => {
    const file = files[0]
    if (file) {
      const image = await uploadImage(file).unwrap()
      onChange(image)
    }
  }

  const {
    inputProps,
    wrapperProps: { onClick }
  } = useDropzone({ onChange: saveImage })

  return (
    <Styled.AvatarFieldWrapper>
      <Styled.ImageWrapper>
        <Image
          loader={s3ImageLoader}
          alt="avatar-image"
          src={
            avatar
              ? avatar.thumbnails[428]
              : '/assets/images/profile-placeholder.jpeg'
          }
          layout="fill"
          objectFit="cover"
        />
        <Styled.Input {...inputProps} multiple={false} />
      </Styled.ImageWrapper>
      <Styled.InfoWrapper>
        <Title>{user.name}</Title>
        <Text color="disabled">@{user.username}</Text>
        <Styled.ChangeText onClick={onClick}>
          {t('changeProfilePhoto')}
        </Styled.ChangeText>
      </Styled.InfoWrapper>
    </Styled.AvatarFieldWrapper>
  )
}

export default Avatar
