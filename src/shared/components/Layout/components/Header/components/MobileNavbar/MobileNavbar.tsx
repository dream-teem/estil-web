import { Title } from '@/components/Typography/Title'
import { config } from '@/config'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import CategoryDropdown from '@/modules/products/components/Dropdown/CategoryDropdown/CategoryDropdown'
import { ProductCategory } from '@/modules/products/types'
import { Close } from '@styled-icons/ionicons-outline/Close'
import { useRouter } from 'next/router'
import React, { useRef } from 'react'
import * as Styled from './styles'

type Props = {
  open?: boolean
  onClose?: () => void
}

function MobileNavbar({ open, onClose }: Props) {
  const router = useRouter()

  const ref = useRef(null)
  useOnClickOutside(ref, () => onClose?.())

  const handleClick = (c: ProductCategory) => {
    onClose?.()
    router.push('/category' + c.path)
  }
  return (
    <Styled.MobileNavbarWrapper open={open} ref={ref}>
      <Styled.MobileMenuInner>
        <Styled.MobileMenuHeader>
          <Styled.MobileHeaderButton>
            <Close width={32} onClick={onClose} />
          </Styled.MobileHeaderButton>
        </Styled.MobileMenuHeader>
        <Styled.MobileNav>
          <Title>Смотреть {config.seo.meta.og.siteName}</Title>
          {open && (
            <CategoryDropdown
              parentShown={true}
              active={[]}
              onChange={handleClick}
            />
          )}
        </Styled.MobileNav>
      </Styled.MobileMenuInner>
    </Styled.MobileNavbarWrapper>
  )
}

export default MobileNavbar
