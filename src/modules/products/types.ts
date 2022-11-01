import { BaseEntity } from '@/types/entities'
import { User } from '../users/types'

export type ProductState = {
  products: Product[]
}

export type Product = BaseEntity & {
  description: string
  images: ProductImage[]
  slug: string
  user: User
  brand: ProductBrand | null
  category: ProductCategory
  size: ProductSize | null
  condition: ProductCondition
  price: number
  promoted: boolean
  currency: string
  isActive: boolean
  isApproved: boolean
}

export type ProductCondition = BaseEntity & {
  title: string
  description: string
  explanation: string
  explanationTitle: string
  order: number
}

export type ProductBrand = BaseEntity & {
  name: string
}
export type Thumbnails = Record<'150' | '310' | '428' | '624' | '1280', string>

export type ProductImage = BaseEntity & {
  thumbnails: Thumbnails
  original: string
}

export type ProductCategory = BaseEntity & {
  name: string
  path: string
  parentId: number | null
  sizeGroupId: number | null
  slug: string
  order: number
  sizeGroups: number[]
  children: ProductCategory[]
  lvl: number
}

export type CategoryWithoutChildren = Omit<ProductCategory, 'children' | 'lvl'>

export type ProductSize = BaseEntity & {
  title: string
  sizeGroupId: number
  order: number
}

export type ProductSizeGroup = BaseEntity & {
  title: string
  description: string
  order: number
  sizes: ProductSize[]
}

export type ProductColor = BaseEntity & {
  title: string
  hex: string
  code: string
  order: number
  border: string | null
}

export type ProductPreview = Pick<Product, 'id' | 'slug' | 'price'> & {
  thumbnails: Thumbnails
}

export type ProductFilter = {
  categories?: number[]
  brands?: number[]
  conditions?: number[]
  colors?: number[]
  sizes?: number[]
  minPrice?: number
  maxPrice?: number
  search?: string
  username?: string
  city?: number
  sort?: 'relevance' | 'recent' | 'priceMin' | 'priceMax'
}

export type ProductFilterAggregateValue = {
  [key: PropertyKey]: {
    count: number
  }
}
export type ProductFilterAggregate = Record<
  'brands' | 'colors' | 'conditions',
  ProductFilterAggregateValue
> & {
  category: {
    [key: PropertyKey]: {
      count: number
      variants: ProductFilterAggregateValue
    }
  }
}
