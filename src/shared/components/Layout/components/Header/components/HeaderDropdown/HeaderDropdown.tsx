import Dropdown from '@/components/Dropdown/Dropdown'
import { AuthUser } from '@/modules/auth/types'
import authApi from '@/services/auth/api'
import { PersonSettings } from '@styled-icons/fluentui-system-filled/PersonSettings'
import { Settings } from '@styled-icons/fluentui-system-regular/Settings'
import { LogOut } from '@styled-icons/ionicons-outline/LogOut'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React from 'react'
import * as Styled from './styles'

type Props = {
  open?: boolean
  user: AuthUser
  onClose?: () => void
}

function HeaderDropdown({ open, user, onClose }: Props) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const [logout] = authApi.endpoints.logout.useMutation()

  if (!open || !user) return null

  const handleClick = (onClick: () => void) => {
    onClick()
    onClose?.()
  }

  const menuOptions = [
    {
      title: t('profile'),
      leftIcon: (
        <Styled.IconWrapper>
          <PersonSettings width={22} />
        </Styled.IconWrapper>
      ),
      onClick: () => router.push(`/profile/${user.username}`)
    },
    {
      title: t('edit'),
      leftIcon: (
        <Styled.IconWrapper>
          <Settings width={22} />
        </Styled.IconWrapper>
      ),
      onClick: () => router.push('/profile/edit')
    },
    {
      title: t('logout'),
      leftIcon: (
        <Styled.IconWrapper>
          <LogOut width={22} />
        </Styled.IconWrapper>
      ),
      onClick: async () => {
        await logout(null)
        router.push('/auth/login')
      }
    }
  ]

  return (
    <Styled.HeaderDropdownWrapper>
      <Dropdown>
        {menuOptions.map(menu => (
          <Dropdown.Item
            key={menu.title}
            title={menu.title}
            leftIcon={menu.leftIcon}
            onClick={() => handleClick(menu.onClick)}
          />
        ))}
      </Dropdown>
    </Styled.HeaderDropdownWrapper>
  )
}

export default HeaderDropdown
