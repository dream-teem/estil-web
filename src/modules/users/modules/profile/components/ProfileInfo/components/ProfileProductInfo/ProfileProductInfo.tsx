import { Text } from '@/components/Typography/Text'
import { Tag } from '@styled-icons/fluentui-system-filled/Tag'
import { Flash } from '@styled-icons/ionicons-solid/Flash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import * as Styled from './styles'

type Props = {
  productCount: number
  lastActive: string
}

function ProfileProductInfo({ productCount, lastActive }: Props) {
  const { t } = useTranslation('profile')

  return (
    <Styled.ProductInfoWrapper>
      <Styled.ProductInfo>
        <Flash width={18} />
        <Text variant="s" color="disabled">
          {lastActive}
        </Text>
      </Styled.ProductInfo>
      <Styled.ProductInfo>
        <Tag width={18} />
        <Text variant="s">{t('itemsSold', { items: productCount })}</Text>
      </Styled.ProductInfo>
    </Styled.ProductInfoWrapper>
  )
}

export default ProfileProductInfo
