import React from 'react'
import { ProductFormContainer } from '../../components/Container/Container'
import { ProductForm } from '../../components/ProductForm/ProductForm'
import { useProduct } from '../../hooks/useProduct'

function CreateProduct() {
  const { create, isLoadingProductCreate } = useProduct()

  return (
    <ProductFormContainer>
      <ProductForm onSubmit={create} isSubmitting={isLoadingProductCreate} />
    </ProductFormContainer>
  )
}

export default CreateProduct
