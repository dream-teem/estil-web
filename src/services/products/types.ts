import {
  Product,
  ProductBrand,
  ProductCategory,
  ProductColor,
  ProductCondition,
  ProductFilter,
  ProductImage,
  ProductPreview,
  ProductVariant
} from '@/modules/products/types'
import { UserProfile } from '@/modules/users/modules/profile/types'
import { City } from '@/types/entities'
import { PaginationArgs } from '@/types/request'
import { PaginatedResponse } from '@/types/response'

export type CreateProductResponse = Product

export type CreateProductRequest = Pick<Product, 'description' | 'price'> & {
  images: ProductImage[]
  colors: number[]
  brandId: number | null
  sizes: ProductVariant[]
  conditionId: number
  categoryId: number
  cityId: number
  quantity: 1
}

export type UpdateProductRequest = CreateProductRequest & Pick<Product, 'id'>

export type GetBrandsResponse = ProductBrand[]

export type GetProductResponse = Pick<
  Product,
  'id' | 'description' | 'slug' | 'price' | 'currency' | 'createdAt'
> & {
  likes: number
  isLiked?: boolean
  moderator?: boolean
  variants: (ProductVariant & { title: string })[]
  brand: Pick<ProductBrand, 'id' | 'name'> | null
  condition: Pick<ProductCondition, 'description' | 'title' | 'id'>
  category: Pick<ProductCategory, 'id' | 'name' | 'slug'>
  seller: Pick<
    UserProfile,
    | 'id'
    | 'picture'
    | 'name'
    | 'username'
    | 'productCount'
    | 'rating'
    | 'lastLoggedIn'
  > & {
    location: string
    phone: string
  }
  colors: Pick<
    ProductColor,
    'id' | 'createdAt' | 'updatedAt' | 'hex' | 'title'
  >[]
  images: Pick<ProductImage, 'original' | 'thumbnails'>[]
  city: City
}

export type GetProductsResponse = PaginatedResponse<'data', ProductPreview[]>

export type GetProductsRequest = PaginationArgs & ProductFilter

export type GetShopProductsRequest = PaginationArgs & {
  isSold?: boolean
  all?: boolean
  isSelling?: boolean
  isLiked?: boolean
  userId: number
}

export type GetProductSearchSuggestionsResponse = Record<
  'suggestions',
  string[]
>
