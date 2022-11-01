import ProfileProductInfo from '@/modules/users/modules/profile/components/ProfileInfo/components/ProfileProductInfo/ProfileProductInfo'
import { GetProductResponse } from '@/services/products/types'
import moment from 'moment'
import 'moment/locale/ru'
import { useTranslation } from 'next-i18next'
import React from 'react'
import SellerInfo from '../SellerInfo/SellerInfo'
import ProductDetails from './ProductDetails/ProductDetails'
import ProductInteractions from './ProductInteractions/ProductInteractions'
import * as Styled from './styles'

type Props = {
  product: GetProductResponse
}

function ProductInfo({ product }: Props) {
  const {
    i18n: { language }
  } = useTranslation()

  const getActiveDate = () => {
    return moment(product.seller.lastLoggedIn).locale(language).fromNow()
  }

  return (
    <Styled.ProductInfoWrapper>
      <ProductInteractions product={product} />
      <ProductDetails product={product} />
      <Styled.SellerInfoWrapper>
        <SellerInfo seller={product.seller} variant="l" rating={true} />
        <ProfileProductInfo
          lastActive={getActiveDate()}
          productCount={product.seller.productCount}
        />
      </Styled.SellerInfoWrapper>
    </Styled.ProductInfoWrapper>
  )
}

export default ProductInfo
