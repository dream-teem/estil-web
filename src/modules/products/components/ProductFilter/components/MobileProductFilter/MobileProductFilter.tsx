import Badge from '@/components/Badge/Badge'
import CityDropdown from '@/components/CityDropdown/CityDropdown'
import Dropdown from '@/components/Dropdown/Dropdown'
import { Button } from '@/components/Elements/Button/styles'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import Modal from '@/components/Modal/Modal'
import { Title } from '@/components/Typography/Title'
import { theme } from '@/constants/theme'
import {
  SORT_OPTIONS,
  useProductFilter
} from '@/modules/products/hooks/useProductFilter'
import { ProductFilter } from '@/modules/products/types'
import { Circle } from '@styled-icons/fluentui-system-filled/Circle'
import { ArrowSortDownLines } from '@styled-icons/fluentui-system-regular/ArrowSortDownLines'
import { ChevronForward } from '@styled-icons/ionicons-outline/ChevronForward'
import { Filter } from '@styled-icons/ionicons-outline/Filter'
import { isNumber } from 'lodash'
import pick from 'lodash/pick'
import values from 'lodash/values'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'
import BrandDropdown from '../../../Dropdown/BrandDropdown/BrandDropdown'
import CategoryDropdown from '../../../Dropdown/CategoryDropdown/CategoryDropdown'
import ColorDropdown from '../../../Dropdown/ColorDropdown/ColorDropdown'
import ConditionDropdown from '../../../Dropdown/ConditionDropdown/ConditionDropdown'
import SizeGroupDropdown from '../../../Dropdown/SizeGroupDropdown/SizeGroupDropdown'
import ActiveFilter from '../ActiveFilter/ActiveFilter'
import PriceRangePicker from '../DesktopProductFilter/components/PriceRangePicker/PriceRangePicker'
import * as Styled from './styles'

type MenuState = {
  open: boolean
  submenu: Submenu | null
}

type Submenu = {
  title: string
  content: () => JSX.Element
}

function MobileProductFilter() {
  const [menu, setMenu] = useState<MenuState>({ open: false, submenu: null })
  const { open, submenu } = menu
  const { filter, onIdToggle, onSortChange, onCityChange, onPriceChange } =
    useProductFilter()
  const { t } = useTranslation(['common', 'product'])

  const handleSubmenuClose = useCallback(() => {
    setMenu({ ...menu, submenu: null })
  }, [menu])

  const handleMenuClose = useCallback(
    () => setMenu({ open: false, submenu: null }),
    []
  )

  const filterCount = useMemo(() => {
    return values(
      pick(
        filter,
        'brands',
        'categories',
        'city',
        'colors',
        'maxPrice',
        'minPrice',
        'sizes',
        'conditions'
      )
    ).reduce<number>(
      (count, value) =>
        (Array.isArray(value) ? value.length : isNumber(value) ? 1 : 0) + count,
      0
    )
  }, [
    filter.brands,
    filter.categories,
    filter.city,
    filter.colors,
    filter.maxPrice,
    filter.minPrice,
    filter.sizes,
    filter.conditions
  ])

  const submenus: Submenu[] = [
    {
      title: t('product:category'),
      content: () => (
        <CategoryDropdown
          parentShown={true}
          onChange={({ id }) => onIdToggle('categories', id)}
          active={filter.categories || []}
        />
      )
    },
    {
      title: t('product:size'),
      content: () => (
        <SizeGroupDropdown
          onChange={({ id }) => onIdToggle('sizes', id)}
          active={filter.sizes || []}
        />
      )
    },
    {
      title: t('product:brand'),
      content: () => (
        <BrandDropdown
          onChange={({ id }) => onIdToggle('brands', id)}
          active={filter.brands || []}
        />
      )
    },
    {
      title: t('product:price'),
      content: () => (
        <PriceRangePicker
          min={filter.minPrice}
          max={filter.maxPrice}
          onPriceChange={onPriceChange}
          currency="KZT"
        />
      )
    },
    {
      title: t('product:condition'),
      content: () => (
        <ConditionDropdown
          onChange={({ id }) => onIdToggle('conditions', id)}
          active={filter.conditions || []}
        />
      )
    },
    {
      title: t('product:color'),
      content: () => (
        <>
          <Spacer />
          <ColorDropdown
            onChange={({ id }) => onIdToggle('colors', id)}
            active={filter.colors || []}
            max={0}
          />
        </>
      )
    },
    {
      title: t('common:location'),
      content: () => (
        <CityDropdown
          onChange={({ id }) => onCityChange(id)}
          active={filter.city ? [filter.city] : []}
        />
      )
    }
  ]

  return (
    <Styled.MobileProductFilterWrapper>
      <Styled.MobileMenuWrapper>
        <Styled.MobileMenuButton
          onClick={() => setMenu({ ...menu, open: true })}
        >
          <Filter width={22} className="filter-icon" />
          <Title>{t('product:filter')}</Title>{' '}
          {filterCount > 0 && (
            <Styled.MobileFilterCountWrapper>
              {filterCount}
            </Styled.MobileFilterCountWrapper>
          )}
        </Styled.MobileMenuButton>
      </Styled.MobileMenuWrapper>
      <Styled.MobileMenuWrapper>
        <Styled.MobileMenuButton>
          <select
            id="sort"
            className="sort-dropdown"
            value={filter.sort}
            onChange={({ target: { value } }) =>
              onSortChange(value as ProductFilter['sort'])
            }
          >
            {SORT_OPTIONS.map(s => (
              <option key={`products-sort-${s}`} value={s}>
                {t(`product:sort.${s}`)}
              </option>
            ))}
          </select>
          <label htmlFor="sort">
            <ArrowSortDownLines width={22} className="filter-icon" />
            <Badge
              content={
                filter.sort &&
                filter.sort !== 'relevance' && (
                  <Circle width={7} color={theme.palette.background.danger} />
                )
              }
            >
              <Title>{t('product:sort')}</Title>
            </Badge>
          </label>
        </Styled.MobileMenuButton>
      </Styled.MobileMenuWrapper>
      {open && (
        <Modal
          title={t('product:filter')}
          onClose={handleMenuClose}
          footerButton={
            <Button fullWidth={true} onClick={handleMenuClose}>
              {t('common:save')}
            </Button>
          }
        >
          <Styled.MobileFilterWrapper>
            <Dropdown>
              {submenus.map(submenu => (
                <Dropdown.Item
                  key={submenu.title}
                  title={submenu.title}
                  onClick={() =>
                    setMenu({
                      ...menu,
                      submenu
                    })
                  }
                  rightIcon={<ChevronForward width={22} />}
                />
              ))}
            </Dropdown>
            <Spacer variant="l" />
            <ActiveFilter />
          </Styled.MobileFilterWrapper>
        </Modal>
      )}
      {submenu && (
        <Modal
          title={submenu.title}
          onClose={handleMenuClose}
          onBack={handleSubmenuClose}
          footerButton={
            <Button fullWidth={true} onClick={handleMenuClose}>
              {t('common:save')}
            </Button>
          }
        >
          <Styled.MobileFilterWrapper>
            {submenu.content()}
          </Styled.MobileFilterWrapper>
        </Modal>
      )}
    </Styled.MobileProductFilterWrapper>
  )
}

export default MobileProductFilter
