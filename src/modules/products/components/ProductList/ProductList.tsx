import { Title } from '@/components/Typography/Title'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import React from 'react'
import { s3ImageLoader } from 'src/shared/helpers/media'
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
              loader={s3ImageLoader}
              alt="product-image"
              layout="fill"
              src={product.preview.thumbnails[310]}
            />
          </Styled.ProductImageWrapper>
          <Title variant="s">{product.price} KZT</Title>
        </Styled.ProductWrapper>
      ))}
    </Styled.ProductListWrapper>
  )
}

export default ProductList
