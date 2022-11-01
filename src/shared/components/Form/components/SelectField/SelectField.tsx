import Button from '@/components/Elements/Button/Button'
import Modal from '@/components/Modal/Modal'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useTranslation } from 'next-i18next'
import React, { useRef, useState } from 'react'
import * as Styled from './styles'

type SelectFieldProps = {
  label: string
  value?: string
  dropdown: React.ReactNode
}

function SelectField({ dropdown, value: title, label }: SelectFieldProps) {
  const { t } = useTranslation('common')
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  const point = useBreakpoint()

  useOnClickOutside(ref, e => {
    setOpen(false)
  })

  const handleClick = () => {
    setOpen(!open)
  }

  const isModalOpen = open

  // moving modal and select dropdown to a function leads to dropdown loses state
  // because it regenerates components

  return (
    <Styled.SelectWrapper>
      <Styled.SelectItem ref={ref} onClick={handleClick}>
        <Styled.SelectTitle>{title}</Styled.SelectTitle>
        <Styled.SelectButtonWrapper></Styled.SelectButtonWrapper>
        {isModalOpen && (
          <Modal
            title={label}
            onClose={handleClick}
            footerButton={
              <Button onClick={handleClick} disabled={!title} fullWidth={true}>
                {t('save')}
              </Button>
            }
          >
            <Styled.DropdownWrapper>{dropdown}</Styled.DropdownWrapper>
          </Modal>
        )}
      </Styled.SelectItem>
    </Styled.SelectWrapper>
  )
}

export default SelectField
