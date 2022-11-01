import { useCategories } from '@/modules/products/hooks/useCategories'
import React from 'react'
import MenuDropdown from './components/MenuDropdown/MenuDropdown'
import * as Styled from './styles'

function DesktopNavbar() {
  const { categories } = useCategories()

  return (
    <Styled.DesktopNavbarWrapper>
      {categories.map(c => (
        <MenuDropdown key={c.id} category={c} />
      ))}
    </Styled.DesktopNavbarWrapper>
  )
}

export default DesktopNavbar
