import { config } from '@/config'
import {
  ProductCategory,
  ProductColor,
  ProductCondition,
  ProductFilter,
  ProductFilterAggregate,
  ProductImage,
  ProductPreview,
  ProductSizeGroup
} from '@/modules/products/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '..'
import {
  CreateProductRequest,
  CreateProductResponse,
  GetBrandsResponse,
  GetProductResponse,
  GetProductSearchSuggestionsResponse,
  GetProductsRequest,
  GetProductsResponse,
  GetShopProductsRequest,
  UpdateProductRequest
} from './types'

export const PRODUCT_API_REDUCER_KEY = 'productApi'

const productApi = createApi({
  reducerPath: PRODUCT_API_REDUCER_KEY,
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: [
    'Products',
    'Suggestions',
    'ShopProducts',
    'LikedProducts',
    'ProductFilterAggregate'
  ],
  endpoints: builder => ({
    create: builder.mutation<CreateProductResponse, CreateProductRequest>({
      query: product => ({
        url: 'products/',
        method: 'POST',
        body: product
      }),
      invalidatesTags: () => [{ type: 'ShopProducts' }]
    }),
    update: builder.mutation<null, UpdateProductRequest>({
      query: product => ({
        url: `products/${product.id}`,
        method: 'PUT',
        body: product
      }),
      invalidatesTags: (res, _, { id }) => [{ type: 'ShopProducts', id }]
    }),
    delete: builder.mutation<null, number>({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: (res, _, id) => [{ type: 'ShopProducts', id }]
    }),
    getProducts: builder.query<GetProductsResponse, GetProductsRequest>({
      query: filter => ({
        url: `${config.api.products.baseUrl}`,
        method: 'GET',
        params: filter
      }),
      providesTags: ['Products']
    }),
    getProductFilterAggregate: builder.query<
      ProductFilterAggregate,
      ProductFilter
    >({
      query: filter => ({
        url: `${config.api.products.baseUrl}filters/aggregate`,
        method: 'GET',
        params: filter
      }),
      providesTags: ['ProductFilterAggregate']
    }),
    getShopProducts: builder.query<GetProductsResponse, GetShopProductsRequest>(
      {
        query: ({ userId, ...params }) => ({
          url: `user/${userId}/products`,
          method: 'GET',
          params
        }),
        providesTags: data =>
          data?.data
            ? data.data.map(p => ({ type: 'ShopProducts', id: p.id }))
            : [{ type: 'ShopProducts' }]
      }
    ),
    getProduct: builder.query<GetProductResponse, string>({
      query: slug => ({
        url: `products/details/${slug}`,
        method: 'GET'
      })
    }),
    getCategoriesTree: builder.query<ProductCategory[], null>({
      query: () => ({
        url: 'products/attributes/categories/tree',
        method: 'GET'
      })
    }),
    getCategoriesById: builder.query<Record<number, ProductCategory>, null>({
      query: () => ({
        url: 'products/attributes/categories/byId',
        method: 'GET'
      })
    }),
    sizeGroups: builder.query<Record<string, ProductSizeGroup>, null>({
      query: () => ({
        url: 'products/attributes/sizeGroups/byId',
        method: 'GET'
      })
    }),
    colors: builder.query<ProductColor[], null>({
      query: () => ({
        url: 'products/attributes/colors',
        method: 'GET'
      })
    }),
    brands: builder.query<GetBrandsResponse, null>({
      query: () => ({
        url: 'products/attributes/brands',
        method: 'GET'
      })
    }),
    conditions: builder.query<ProductCondition[], null>({
      query: () => ({
        url: 'products/attributes/conditions',
        method: 'GET'
      })
    }),
    getFavorite: builder.query<ProductPreview[], null>({
      query: () => ({
        url: 'products/liked',
        method: 'GET'
      }),
      providesTags: products =>
        products
          ? products.map(p => ({ type: 'LikedProducts' }))
          : [{ type: 'LikedProducts' }]
    }),
    getSearchSuggestions: builder.query<
      GetProductSearchSuggestionsResponse,
      string
    >({
      query: search => ({
        url: `${config.api.products.baseUrl}suggestions`,
        method: 'GET',
        params: { search }
      }),
      providesTags: ['Suggestions']
    }),
    uploadImage: builder.mutation<ProductImage, File>({
      query: file => {
        const body = new FormData()
        body.append('file', file)
        return {
          url: 'products/images/uploadImage',
          method: 'POST',
          body
        }
      }
    }),
    toggleLike: builder.mutation<{}, GetProductResponse>({
      query: ({ id }) => ({
        url: 'products/likes/toggle',
        method: 'POST',
        body: {
          productId: id
        }
      }),
      invalidatesTags: (_, base, { id }) => [{ type: 'LikedProducts' }],
      async onQueryStarted({ slug }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          productApi.util.updateQueryData('getProduct', slug, product => {
            if (product.isLiked) {
              product.likes -= 1
            } else {
              product.likes += 1
            }
            product.isLiked = !product.isLiked
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      }
    })
  })
})

export default productApi
