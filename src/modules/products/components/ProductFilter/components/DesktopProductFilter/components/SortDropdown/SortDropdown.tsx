import Dropdown from '@/components/Dropdown/Dropdown'
import { SORT_OPTIONS } from '@/modules/products/hooks/useProductFilter'
import { Checkmark } from '@styled-icons/ionicons-outline/Checkmark'
import { useTranslation } from 'next-i18next'
import React from 'react'

type Sort = typeof SORT_OPTIONS[number]

type Props = {
  onChange: (val: Sort) => void
  active?: Sort | null
}

function SortDropdown({ onChange, active }: Props) {
  const { t } = useTranslation('product')
  return (
    <Dropdown>
      {SORT_OPTIONS.map(sort => (
        <Dropdown.Item
          key={`sort-dropdown-${sort}`}
          title={t(`sort.${sort}`)}
          onClick={() => onChange(sort)}
          rightIcon={active === sort && <Checkmark width={22} />}
        />
      ))}
    </Dropdown>
  )
}

export default SortDropdown
