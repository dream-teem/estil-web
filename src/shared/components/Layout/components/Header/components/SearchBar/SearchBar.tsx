import Modal from '@/components/Modal/Modal'
import SearchBarComponent from '@/components/SearchBar/SearchBar'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import * as Styled from './styles'

type Props = {
  open: boolean
  onClose?: () => void
}
function SearchBar({ open, onClose }: Props) {
  const { t } = useTranslation('common')
  const router = useRouter()
  const defaultSearch = !Array.isArray(router.query.search)
    ? router.query.search || ''
    : ''
  const [search, setSearch] = useState(defaultSearch)
  const brkPnt = useBreakpoint()

  return (
    <>
      {brkPnt === 'lg' ? (
        <Styled.SearchBarOuter>
          <SearchBarComponent search={search} onChange={v => setSearch(v)} />
        </Styled.SearchBarOuter>
      ) : (
        open && (
          <Modal title={t('search')} onClose={onClose}>
            <Styled.ModalContentWrapper>
              <SearchBarComponent
                search={search}
                onChange={v => setSearch(v)}
                onSearch={() => onClose?.()}
                mobile={true}
              />
            </Styled.ModalContentWrapper>
          </Modal>
        )
      )}
    </>
  )
}

export default SearchBar
