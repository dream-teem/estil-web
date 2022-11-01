import { useState } from 'react'
import { ProductCategory, ProductSize, ProductSizeGroup } from '../types'

type Values = {
  category: ProductCategory | null
  condition: null
  brand: null
  size: ProductSize | null
}

type Props = {
  values: Partial<Values>
  categories: ProductCategory[]
  sizeGroups: Record<string, ProductSizeGroup>
}

function useProductSelect({
  sizeGroups,
  categories,
  values: { category = null, condition = null, brand = null, size = null }
}: Props) {
  const [values, setValues] = useState<Values>({
    category,
    condition,
    brand,
    size
  })

  const onCategoryChange = (category: ProductCategory) => {
    setValues({
      ...values,
      category
    })
  }

  const onSizeChange = (size: ProductSize) => {
    setValues({ ...values, size })
  }

  const onSizeGroupChange = (id: number) => {
    const sg = sizeGroups[id]
  }

  return { onCategoryChange, onSizeChange, ...values }
}

export default useProductSelect
