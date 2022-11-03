import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { useDropzone } from '@/modules/products/components/ProductForm/components/ImageForm/components/ImageDropzone/hooks/useDropzone'
import { Thumbnails } from '@/modules/users/types'
import productApi from '@/services/products/api'
import { GetUserResponse } from '@/services/users/types'
import { useTranslation } from 'next-i18next'
import Image from "next/legacy/image";
import React from 'react'
import * as Styled from './styles'

type Props = {
  avatar?: Thumbnails | null
  user: GetUserResponse
  onChange: (image: Thumbnails) => void
}

function Avatar({ avatar, onChange, user }: Props) {
  const { t } = useTranslation('profile')

  const [uploadImage, { isLoading }] =
    productApi.endpoints.saveImage.useMutation()

  const saveImage = async (files: File[]) => {
    const file = files[0]
    if (file) {
      const image = await uploadImage(file).unwrap()
      onChange(image.thumbnails)
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
          alt="avatar-image"
          src={avatar ? avatar[428] : '/assets/images/profile-placeholder.jpeg'}
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
