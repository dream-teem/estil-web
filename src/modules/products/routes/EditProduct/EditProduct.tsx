import { GetProductResponse } from '@/services/products/types'
import React from 'react'
import { ProductFormContainer } from '../../components/Container/Container'
import { ProductForm } from '../../components/ProductForm/ProductForm'
import { useProduct } from '../../hooks/useProduct'

type Props = {
  product: GetProductResponse
}
function EditProduct({ product }: Props) {
  const { update, isLoadingProductUpdate } = useProduct()

  return (
    <ProductFormContainer>
      <ProductForm
        onSubmit={data => update(product, data)}
        product={product}
        isSubmitting={isLoadingProductUpdate}
      />
    </ProductFormContainer>
  )
}

export default EditProduct
