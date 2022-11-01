import Dropdown from '@/components/Dropdown/Dropdown'
import { LinkWrapper } from '@/components/Elements/LinkWrapper/LinkWrapper'
import { Text } from '@/components/Typography/Text'
import { ProductCategory } from '@/modules/products/types'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import React from 'react'
import * as Styled from './styles'

type Props = { category: ProductCategory }

function MenuDropdown({ category }: Props) {
  const { t } = useTranslation('common')
  return (
    <Styled.DropdownWrapper>
      <Text>{category.name}</Text>
      <Styled.DropdownContentWrapper>
        <Dropdown>
          <Link href={`/category${category.path}`}>
            <LinkWrapper>
              <Dropdown.Item title={t('category.all')} />
            </LinkWrapper>
          </Link>
          {category.children.map(c => (
            <Link key={c.id} href={`/category${c.path}`}>
              <LinkWrapper>
                <Dropdown.Item key={c.id} title={c.name} />
              </LinkWrapper>
            </Link>
          ))}
        </Dropdown>
      </Styled.DropdownContentWrapper>
    </Styled.DropdownWrapper>
  )
}

export default MenuDropdown
