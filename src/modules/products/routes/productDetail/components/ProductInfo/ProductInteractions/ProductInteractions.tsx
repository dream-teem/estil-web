import AuthWrapper from '@/components/Elements/Button/AuthWrapper'
import { Text } from '@/components/Typography/Text'
import productApi from '@/services/products/api'
import { GetProductResponse } from '@/services/products/types'
import { Heart } from '@styled-icons/ionicons-outline/Heart'
import { Mail } from '@styled-icons/ionicons-outline/Mail'
import { Heart as HeartFilled } from '@styled-icons/ionicons-solid/Heart'
import { Trans, useTranslation } from 'next-i18next'
import React from 'react'
import { useTheme } from 'styled-components'
import * as Styled from './styles'

type Props = {
  product: GetProductResponse
}

function ProductInteractions({ product }: Props) {
  const { t } = useTranslation('product')
  const [toggleLike] = productApi.endpoints.toggleLike.useMutation()
  const theme = useTheme()

  const handleLikeClick = () => {
    toggleLike(product)
  }

  const LikeButton = () => {
    if (product.isLiked)
      return (
        <HeartFilled width={28} color={theme.palette.background.secondary} />
      )
    return <Heart width={28} />
  }

  return (
    <Styled.ProductInteractionsWrapper>
      <Styled.IconButtonWrapper>
        <AuthWrapper onClick={handleLikeClick}>
          <LikeButton />
        </AuthWrapper>
      </Styled.IconButtonWrapper>
      <Styled.IconButtonWrapper>
        <Mail width={28} />
      </Styled.IconButtonWrapper>
      <Styled.LikeTextWrapper>
        <Text>
          <Trans
            t={t}
            i18nKey="likes"
            values={{ likes: product.likes }}
            components={{ bold: <strong /> }}
          />
        </Text>
      </Styled.LikeTextWrapper>
    </Styled.ProductInteractionsWrapper>
  )
}

export default ProductInteractions
