import Dropdown from '@/components/Dropdown/Dropdown'
import { Text } from '@/components/Typography/Text'
import { useCategories } from '@/modules/products/hooks/useCategories'
import { ProductCategory } from '@/modules/products/types'
import { ArrowBack } from '@styled-icons/ionicons-outline/ArrowBack'
import { Checkmark } from '@styled-icons/ionicons-outline/Checkmark'
import { ChevronForward } from '@styled-icons/ionicons-outline/ChevronForward'
import isEmpty from 'lodash/isEmpty'
import { useTranslation } from 'next-i18next'
import { useCallback, useState } from 'react'
import * as Styled from './styles'

type Props = {
  onChange: (c: ProductCategory) => void
  active: number[]
  parentShown?: boolean
}

function CategoryDropdown({ onChange, active, parentShown }: Props) {
  const { t } = useTranslation('common')
  const { categories, categoryMap } = useCategories()

  const [parentCategory, setParentCategory] = useState<ProductCategory | null>(
    null
  )

  const handleClick = useCallback((category: ProductCategory) => {
    if (!isEmpty(category.subCategories)) {
      setParentCategory(category)
    } else {
      onChange?.(category)
    }
  }, [])

  const handleClickBack = useCallback(() => {
    if (parentCategory) {
      const { parentId } = parentCategory
      const parent = parentId ? categoryMap[parentId] : null
      setParentCategory(parent)
    }
  }, [parentCategory])

  const CategoryDropdown = ({
    categories
  }: Record<'categories', ProductCategory[]>) => {
    return (
      <Dropdown>
        {categories.map(c => (
          <Dropdown.Item
            key={c.id}
            title={c.name}
            onClick={() => handleClick(c)}
            rightIcon={<DropdownIcon category={c} />}
          />
        ))}
      </Dropdown>
    )
  }

  const DropdownIcon = ({ category }: Record<'category', ProductCategory>) => {
    if (!isEmpty(category.subCategories)) return <ChevronForward width={22} />
    if (active.includes(category.id)) return <Checkmark width={22} />
    return null
  }

  const getCategories = useCallback(() => {
    if (parentCategory) {
      const categoryList: ProductCategory[] = []
      if (parentShown)
        categoryList.push({
          ...parentCategory,
          name: t('category.all'),
          subCategories: []
        })
      return categoryList.concat(parentCategory.subCategories)
    }
    return categories
  }, [parentCategory, categories])

  return (
    <Styled.CategoryDropdownWrapper>
      {parentCategory && (
        <Styled.DropdownHeader>
          <Styled.HeaderButton>
            <ArrowBack width={22} onClick={handleClickBack} />
          </Styled.HeaderButton>
          <Text>{parentCategory.name}</Text>
          <Styled.HeaderButton></Styled.HeaderButton>
        </Styled.DropdownHeader>
      )}
      <CategoryDropdown categories={getCategories()} />
    </Styled.CategoryDropdownWrapper>
  )
}

export default CategoryDropdown
