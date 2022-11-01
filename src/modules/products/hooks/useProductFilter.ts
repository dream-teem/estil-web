import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import isNaN from 'lodash/isNaN'
import pickBy from 'lodash/pickBy'
import values from 'lodash/values'
import { useRouter } from 'next/router'
import { useCallback, useMemo } from 'react'
import { ProductFilter } from '../types'
import { useCategories } from './useCategories'

export const SORT_OPTIONS = [
  'relevance',
  'recent',
  'priceMin',
  'priceMax'
] as const

export const useProductFilter = () => {
  const router = useRouter()
  const { categoryMap } = useCategories()

  // for category page
  const slugs = <string[]>get(router, 'query.slug')

  const category = useMemo(() => {
    if (slugs && Array.isArray(slugs)) {
      const categoryPath = '/' + slugs.join('/')
      return values(categoryMap).find(c => c.path === categoryPath)
    }
  }, [slugs])

  const parseArray = (query?: string | string[]): number[] | undefined => {
    let values: number[]
    if (!query) return

    if (!Array.isArray(query)) {
      values = query
        .split(',')
        .filter(Boolean)
        .map(Number)
        .filter(v => !isNaN(v))
      return Array.from(new Set(values))
    } else {
      values = query
        .filter(Boolean)
        .map(Number)
        .filter(v => !isNaN(v))
    }
    return values
  }

  const parseString = (query?: string | string[]): string | undefined => {
    if (!query || Array.isArray(query)) return

    return query
  }

  const parseIntQuery = (query?: string | string[]): number | undefined => {
    if (typeof query === 'string' && !isNaN(Number(query))) return Number(query)
  }

  const getSort = (sort?: string): ProductFilter['sort'] => {
    if (sort && ['relevance', 'recent', 'priceMin', 'priceMax'].includes(sort))
      return sort as ProductFilter['sort']
  }

  const filter: ProductFilter = useMemo(
    () => ({
      categories: category
        ? [category.id]
        : parseArray(router.query.categories),
      brands: parseArray(router.query.brands),
      sizes: parseArray(router.query.sizes),
      conditions: parseArray(router.query.conditions),
      colors: parseArray(router.query.colors),
      search: parseString(router.query.search)?.trim(),
      sort: getSort(parseString(router.query.sort)),
      city: parseIntQuery(router.query.city),
      minPrice: parseIntQuery(router.query.minPrice),
      maxPrice: parseIntQuery(router.query.maxPrice)
    }),
    [
      router.query.categories,
      router.query.brands,
      router.query.sizes,
      router.query.conditions,
      router.query.colors,
      router.query.search,
      router.query.sort,
      router.query.city,
      router.query.minPrice,
      router.query.maxPrice,
      category
    ]
  )
  console.log(router.query.categories)
  const onCityChange = (city: number) => {
    if (filter.city === city) delete filter.city
    else filter['city'] = city

    router.push(
      {
        pathname: router.asPath.split('?')[0],
        query: notEmptyFilter(filter)
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const onPriceChange = (price: Record<'min' | 'max', number | undefined>) => {
    filter.minPrice = price.min
    filter.maxPrice = price.max
    router.push(
      {
        pathname: router.asPath.split('?')[0],
        query: notEmptyFilter(filter)
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const onIdToggle = (
    type: keyof Pick<
      ProductFilter,
      'brands' | 'categories' | 'conditions' | 'sizes' | 'colors'
    >,
    newId: number
  ) => {
    if (filter[type]?.includes(newId))
      filter[type] = filter[type]?.filter(id => id !== newId)
    else filter[type] = [...(filter[type] || []), newId]

    // if page is category page and category filter changes
    if (type === 'categories' && category) {
      router.push({
        pathname: '/products',
        query: notEmptyFilter(filter)
      })
    }

    router.push(
      {
        pathname: router.asPath.split('?')[0],
        query: notEmptyFilter(filter)
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const onSortChange = (sort: ProductFilter['sort']) => {
    router.push(
      {
        pathname: router.asPath.split('?')[0],
        query: notEmptyFilter({ ...filter, sort })
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const updateFilter = (filter: ProductFilter, pathname: string) => {
    router.push(
      {
        pathname,
        query: notEmptyFilter(filter)
      },
      undefined,
      {
        shallow: true
      }
    )
  }

  const notEmptyFilter = useCallback((filter: ProductFilter) => {
    return pickBy(filter, value => {
      if (typeof value === 'object' || typeof value === 'string')
        !isEmpty(value)
      return !!value
    })
  }, [])

  const resetFilter = (type: keyof ProductFilter) => {
    delete filter[type]
    router.push({ pathname: router.asPath, query: filter }, undefined, {
      shallow: true
    })
  }

  const resetAll = () => {
    router.push({ pathname: router.asPath, query: router.query }, undefined, {
      shallow: true
    })
  }
  return {
    filter,
    onIdToggle,
    resetAll,
    resetFilter,
    updateFilter,
    onSortChange,
    onCityChange,
    onPriceChange
  }
}
