import { useCities } from '@/components/CityDropdown/useCities'
import { useBrands } from '@/modules/products/hooks/useBrands'
import { useCategories } from '@/modules/products/hooks/useCategories'
import { useColors } from '@/modules/products/hooks/useColors'
import { useConditions } from '@/modules/products/hooks/useConditions'
import { useProductFilter } from '@/modules/products/hooks/useProductFilter'
import { useSizeGroups } from '@/modules/products/hooks/useSizeGroups'
import { useTranslation } from 'next-i18next'
import React from 'react'
import ActiveFilterTag from './components/ActiveFilterTag/ActiveFilterTag'
import * as Styled from './styles'

type Props = {}

function ActiveFilter({}: Props) {
  const { t } = useTranslation('common')
  const { filter, onIdToggle, onCityChange, onPriceChange } = useProductFilter()
  const { categoryMap } = useCategories()
  const { sizes } = useSizeGroups()
  const { brands } = useBrands()
  const conditions = useConditions()
  const cities = useCities()
  const colors = useColors()

  const city = cities.cities.find(({ id }) => id === filter.city)

  const price = `${filter.minPrice || 0} - ${filter.maxPrice || '~'} KZT`
  return (
    <Styled.ActiveFilterWrapper>
      {filter.categories
        ?.map(id => categoryMap[id])
        .filter(Boolean)
        .map(c => (
          <ActiveFilterTag
            key={`categories-filter-${c.id}`}
            title={c.name}
            onClick={() => onIdToggle('categories', c.id)}
          />
        ))}
      {brands
        .filter(({ id }) => filter.brands?.includes(id))
        .map(b => (
          <ActiveFilterTag
            key={`brands-filter-${b.id}`}
            title={b.name}
            onClick={() => onIdToggle('brands', b.id)}
          />
        ))}
      {(filter.minPrice || filter.maxPrice) && (
        <ActiveFilterTag
          title={`${t('price')}: ${price}`}
          onClick={() =>
            onPriceChange({
              min: undefined,
              max: undefined
            })
          }
        />
      )}
      {conditions
        .filter(({ id }) => filter.conditions?.includes(id))
        .map(cn => (
          <ActiveFilterTag
            key={`conditions-filter-${cn.id}`}
            title={cn.title}
            onClick={() => onIdToggle('conditions', cn.id)}
          />
        ))}
      {sizes
        .filter(({ id }) => filter.sizes?.includes(id))
        .map(s => (
          <ActiveFilterTag
            key={`sizes-filter-${s.id}`}
            title={s.title}
            onClick={() => onIdToggle('sizes', s.id)}
          />
        ))}

      {colors
        .filter(({ id }) => filter.colors?.includes(id))
        .map(s => (
          <ActiveFilterTag
            key={`colors-filter-${s.id}`}
            title={`${t('product:color')}: ${s.title}`}
            onClick={() => onIdToggle('colors', s.id)}
          />
        ))}

      {city && (
        <ActiveFilterTag
          title={`${t('location')}: ${city.name}`}
          onClick={() => onCityChange(city.id)}
        />
      )}
    </Styled.ActiveFilterWrapper>
  )
}

export default ActiveFilter
