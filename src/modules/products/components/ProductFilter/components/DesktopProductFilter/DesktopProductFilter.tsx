import CityDropdown from '@/components/CityDropdown/CityDropdown'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { useProductFilter } from '@/modules/products/hooks/useProductFilter'
import { useTranslation } from 'next-i18next'
import React from 'react'
import BrandDropdown from '../../../Dropdown/BrandDropdown/BrandDropdown'
import CategoryDropdown from '../../../Dropdown/CategoryDropdown/CategoryDropdown'
import ColorDropdown from '../../../Dropdown/ColorDropdown/ColorDropdown'
import ConditionDropdown from '../../../Dropdown/ConditionDropdown/ConditionDropdown'
import SizeGroupDropdown from '../../../Dropdown/SizeGroupDropdown/SizeGroupDropdown'
import ActiveFilter from '../ActiveFilter/ActiveFilter'
import PriceRangePicker from './components/PriceRangePicker/PriceRangePicker'
import ProductDropdown from './components/ProductDropdown/ProductDropdown'
import SortDropdown from './components/SortDropdown/SortDropdown'
import * as Styled from './styles'

function DesktopProductFilter() {
  const { filter, onIdToggle, onCityChange, onSortChange, onPriceChange } =
    useProductFilter()
  const { t } = useTranslation(['location', 'product'])

  return (
    <Styled.ProductFilterOuterWrapper>
      <Styled.ProductFilterWrapper>
        <Styled.ProductFilterInnerWrapper>
          <ProductDropdown title={t('product:category')}>
            <CategoryDropdown
              parentShown={true}
              onChange={({ id }) => onIdToggle('categories', id)}
              active={filter.categories || []}
            />
          </ProductDropdown>
          <ProductDropdown title={t('product:brand')}>
            <Spacer />
            <BrandDropdown
              onChange={({ id }) => onIdToggle('brands', id)}
              active={filter.brands || []}
            />
          </ProductDropdown>
          <ProductDropdown title={t('product:size')}>
            <SizeGroupDropdown
              category={null}
              onChange={({ id }) => onIdToggle('sizes', id)}
              active={filter.sizes || []}
            />
          </ProductDropdown>{' '}
          <ProductDropdown title={t('product:price')}>
            <Spacer />
            <PriceRangePicker
              min={filter.minPrice}
              max={filter.maxPrice}
              onPriceChange={onPriceChange}
              currency="KZT"
            />
            <Spacer />
          </ProductDropdown>
          <ProductDropdown title={t('product:condition')}>
            <ConditionDropdown
              onChange={({ id }) => onIdToggle('conditions', id)}
              active={filter.conditions || []}
            />
          </ProductDropdown>
          <ProductDropdown title={t('product:color')}>
            <Spacer />
            <ColorDropdown
              onChange={({ id }) => onIdToggle('colors', id)}
              active={filter.colors || []}
              max={0}
            />
          </ProductDropdown>
          <ProductDropdown title={t('common:location')}>
            <Spacer />
            <CityDropdown
              onChange={({ id }) => onCityChange(id)}
              active={filter.city ? [filter.city] : []}
            />
          </ProductDropdown>
        </Styled.ProductFilterInnerWrapper>
        <Styled.SortWrapper>
          <ProductDropdown title={t('product:sort')} position="left">
            <SortDropdown
              onChange={sort => onSortChange(sort)}
              active={filter.sort}
            />
          </ProductDropdown>
        </Styled.SortWrapper>
      </Styled.ProductFilterWrapper>
      <ActiveFilter />
    </Styled.ProductFilterOuterWrapper>
  )
}

export default DesktopProductFilter
