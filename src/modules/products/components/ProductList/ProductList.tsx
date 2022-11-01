import { Title } from '@/components/Typography/Title'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'
import { ProductPreview } from '../../types'
import * as Styled from './styles'
type Props = {
  products: ProductPreview[]
}

function ProductList({ products }: Props) {
  const router = useRouter()

  const handleClick = (slug: string) => {
    router.push(`/products/${slug}`)
  }

  return (
    <Styled.ProductListWrapper>
      {products.map(product => (
        <Styled.ProductWrapper key={`products-list-${product.id}`}>
          <Styled.ProductImageWrapper onClick={() => handleClick(product.slug)}>
            <Image
              alt="product-image"
              layout="fill"
              src={
                product.thumbnails[310]
                  ? product.thumbnails[310]
                  : '/assets/images/image-placeholder.jpg'
              }
            />
          </Styled.ProductImageWrapper>
          <Title variant="s">{product.price} KZT</Title>
        </Styled.ProductWrapper>
      ))}
    </Styled.ProductListWrapper>
  )
}

export default ProductList
