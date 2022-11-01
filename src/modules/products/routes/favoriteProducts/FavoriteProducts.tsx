import { Title } from '@/components/Typography/Title'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ProductList from '../../components/ProductList/ProductList'
import { ProductPreview } from '../../types'
import * as Styled from './styles'

type Props = {
  products: ProductPreview[]
}

function FavoriteProducts({ products }: Props) {
  const { t } = useTranslation('product')
  return (
    <Styled.FavoriteProductsWrapper>
      <Title> {t('favoriteItems')}</Title>
      <ProductList products={products} />
    </Styled.FavoriteProductsWrapper>
  )
}

export default FavoriteProducts
