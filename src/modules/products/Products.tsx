import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { Text } from '@/components/Typography/Text'
import { useTranslation } from 'next-i18next'
import React from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import ProductFilter from './components/ProductFilter/ProductFilter'
import ProductList from './components/ProductList/ProductList'
import { useProducts } from './hooks/useProducts'
import * as Styled from './styles'

console.log()

function Products() {
  const { isLoading, error, products, hasMore, loadMore, count } = useProducts()

  const { t } = useTranslation(['product', 'common'])
  return (
    <Styled.ProductWrapper>
      <ProductFilter />
      <Styled.ProductListWrapper>
        <InfiniteScroll
          dataLength={products.length || 0}
          next={loadMore}
          hasMore={hasMore}
          loader={<FillContainerLoader />}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>{t('common:products.listEnd')}</b>
            </p>
          }
        >
          <ProductList products={products} />
          {/* {hasMore && <Button onClick={loadMore}>Load More</Button>} */}
          {!isLoading && !error && products?.length === 0 && (
            <Text>{t('product:noProduct')}</Text>
          )}
        </InfiniteScroll>
      </Styled.ProductListWrapper>
    </Styled.ProductWrapper>
  )
}

export default Products
