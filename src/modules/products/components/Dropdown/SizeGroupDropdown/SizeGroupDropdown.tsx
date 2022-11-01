import Dropdown from '@/components/Dropdown/Dropdown'
import { useCategories } from '@/modules/products/hooks/useCategories'
import React from 'react'
import { CategoryWithoutChildren, ProductSize } from '../../../types'
import { SizeGroupCategory } from './SizeGroupCategoryDropdown'
import * as Styled from './styles'

type Props = {
  category?: CategoryWithoutChildren | null
  onChange?: (size: ProductSize) => void
  active: number[]
}

function SizeGroupDropdown({ active, onChange, category }: Props) {
  const { categories } = useCategories()

  return (
    <Styled.SizeGroupDropdownWrapper>
      {!category ? (
        <Dropdown>
          {categories
            .filter(c => c.sizeGroups.length > 0)
            .map(c => (
              <Dropdown.CollapsibleItem key={c.id} title={c.name}>
                <SizeGroupCategory
                  active={active}
                  category={c}
                  onChange={onChange}
                />
              </Dropdown.CollapsibleItem>
            ))}
        </Dropdown>
      ) : (
        <SizeGroupCategory
          active={active}
          category={category}
          onChange={onChange}
        />
      )}
    </Styled.SizeGroupDropdownWrapper>
  )
}

export default SizeGroupDropdown
