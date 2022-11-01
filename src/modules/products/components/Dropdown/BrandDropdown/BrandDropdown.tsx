import Dropdown from '@/components/Dropdown/Dropdown'
import SearchBar from '@/components/SearchBar/SearchBar'
import { useBrands } from '@/modules/products/hooks/useBrands'
import { ProductBrand } from '@/modules/products/types'
import { Checkmark } from '@styled-icons/ionicons-outline/Checkmark'
import { useTranslation } from 'next-i18next'
import * as Styled from './styles'

type Props = {
  onChange: (c: ProductBrand) => void
  /**
   * pass [0] array to choose no brand
   */
  active: number[]
  optional?: boolean
  onReset?: () => void
}

function BrandDropdown({ onChange, onReset, active, optional }: Props) {
  const { t } = useTranslation('product')
  const { brands, search, searchBrands } = useBrands()

  const DropdownIcon = ({ brand }: Record<'brand', ProductBrand>) => {
    if (active.includes(brand.id)) return <Checkmark width={22} />
    return null
  }

  return (
    <Styled.BrandDropdownWrapper>
      <Styled.DropdownHeader>
        <SearchBar search={search} onChange={searchBrands} />
      </Styled.DropdownHeader>
      <Dropdown>
        {optional && (
          <Dropdown.Item
            rightIcon={active.includes(0) && <Checkmark width={22} />}
            title={t('brand.noBrand')}
            onClick={onReset}
          />
        )}
        {brands.map(b => (
          <Dropdown.Item
            key={b.id}
            title={b.name}
            rightIcon={<DropdownIcon brand={b} />}
            onClick={() => onChange?.(b)}
          />
        ))}
      </Dropdown>
    </Styled.BrandDropdownWrapper>
  )
}

export default BrandDropdown
