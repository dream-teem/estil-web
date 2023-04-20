import StarIcon from '@/components/Icon/StarIcon'
import { Text } from '@/components/Typography/Text'
import { useCategories } from '@/modules/products/hooks/useCategories'
import { useRouter } from 'next/router'
import React from 'react'
import MenuDropdown from './components/MenuDropdown/MenuDropdown'
import { DropdownWrapper } from './components/MenuDropdown/styles'
import * as Styled from './styles'

function DesktopNavbar() {
  const { categories } = useCategories()
  const router = useRouter()

  return (
    <Styled.DesktopNavbarWrapper>
      {categories.map(c => (
        <MenuDropdown key={c.id} category={c} />
      ))}
      <DropdownWrapper onClick={() => router.push('/recommendations')}>
        <Text>Рекомендованы для вас</Text> <StarIcon />
      </DropdownWrapper>
    </Styled.DesktopNavbarWrapper>
  )
}

export default DesktopNavbar
