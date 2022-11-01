import { Title } from '@/components/Typography/Title'
import { Trans, useTranslation } from 'next-i18next'
import React from 'react'
import { useProductFilter } from '../../hooks/useProductFilter'
import { useProducts } from '../../hooks/useProducts'
import Products from '../../Products'
import * as Styled from './styles'

function ProductSearch() {
  const { t } = useTranslation('product')
  const { filter } = useProductFilter()
  const { count } = useProducts()

  return (
    <Styled.ProductSearchWrapper>
      <Styled.SearchInfoWrapper>
        <Styled.SearchInfoRow>
          <Trans
            i18nKey="searchResults"
            t={t}
            values={{ count, search: filter.search }}
            components={{
              bold: <Title />
            }}
          />
        </Styled.SearchInfoRow>
        <Styled.SearchInfoRow>
          <Title variant="l">&quot;{filter.search}&quot;</Title>
        </Styled.SearchInfoRow>
      </Styled.SearchInfoWrapper>
      <Products />
    </Styled.ProductSearchWrapper>
  )
}

export default ProductSearch
