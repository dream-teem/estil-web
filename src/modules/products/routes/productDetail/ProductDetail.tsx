import { GetProductResponse } from '@/services/products/types'
import React from 'react'
import { ProductDetailContainer } from './components/Container/Container'
import Gallery from './components/Gallery/Galery'
import ProductInfo from './components/ProductInfo/ProductInfo'
import SellerInfo from './components/SellerInfo/SellerInfo'
import * as Styled from './styles'

type Props = {
  product: GetProductResponse
}

function ProductDetail({ product }: Props) {
  return (
    <ProductDetailContainer>
      <Styled.SellerInfoWrapper>
        <SellerInfo seller={product.seller} />
      </Styled.SellerInfoWrapper>
      <Gallery product={product} />
      <ProductInfo product={product} />
    </ProductDetailContainer>
  )
}

export default ProductDetail
