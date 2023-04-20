import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import productApi from '@/services/products/api'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import ProductList from './components/ProductList/ProductList'
import * as Styled from './styles'
import { ProductPreview } from './types'

function RecommendatedProducts() {
  const [getRecommendations, { isLoading, data: products = [], error }] =
    productApi.endpoints.getRecommended.useMutation()

  const { t } = useTranslation(['product', 'common'])

  useEffect(() => {
    getRecommendations()
  }, [])

  const recommendedProducts: ProductPreview[] = products.map(product => {
    return {
      id: product.id,
      slug: product.slug,
      price: product.price,
      preview: product.images[0]
    }
  })
  return (
    <Styled.ProductWrapper>
      <Styled.ProductListWrapper>
        <Title style={{ padding: '1rem' }}>Рекоммендовано только для вас</Title>
        <ProductList products={recommendedProducts} />
        {!isLoading && !error && products?.length === 0 && (
          <Text>{t('product:noProduct')}</Text>
        )}
      </Styled.ProductListWrapper>
    </Styled.ProductWrapper>
  )
}

export default RecommendatedProducts
