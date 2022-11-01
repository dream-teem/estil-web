import Button from '@/components/Elements/Button/Button'
import Modal from '@/components/Modal/Modal'
import useBreakpoint from '@/hooks/useBreakpoint'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { ChevronDown } from '@styled-icons/ionicons-outline/ChevronDown'
import { ChevronForward } from '@styled-icons/ionicons-outline/ChevronForward'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useRef, useState } from 'react'
import * as Styled from './styles'

type SelectFieldProps = {
  label: string
  value?: string
  dropdown: React.ReactNode
  placeholder?: string
  closeOnSelect?: boolean
}

function SelectField({
  dropdown,
  value,
  label,
  placeholder,
  closeOnSelect = true
}: SelectFieldProps) {
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

  useEffect(() => {
    // close select field on value change
    if (value && closeOnSelect) setOpen(false)
  }, [value])

  const isModalOpen = open && (point === 'xs' || point === 'sm')
  const isDropdownOpen = open && !isModalOpen

  // moving modal and select dropdown to a function leads to dropdown loses state
  // because it regenerates components

  return (
    <Styled.SelectWrapper>
      <Styled.SelectItem ref={ref} onClick={handleClick}>
        <Styled.SelectTitle>{value || placeholder}</Styled.SelectTitle>
        <Styled.SelectButtonWrapper>
          {!open ? <ChevronForward width={22} /> : <ChevronDown width={22} />}
        </Styled.SelectButtonWrapper>
        {isModalOpen && (
          <Modal
            title={label}
            onClose={handleClick}
            footerButton={
              <Button onClick={handleClick} disabled={!value} fullWidth={true}>
                {t('save')}
              </Button>
            }
          >
            <Styled.DropdownWrapper>{dropdown}</Styled.DropdownWrapper>
          </Modal>
        )}
        {isDropdownOpen && (
          <Styled.SelectDropdown onClick={e => e.stopPropagation()}>
            <Styled.DropdownWrapper>{dropdown}</Styled.DropdownWrapper>
            {/* <Styled.ActionWrapper>
              <Button className="save-button" onClick={handleClick}>
                {t('save')}
              </Button>
            </Styled.ActionWrapper> */}
          </Styled.SelectDropdown>
        )}
      </Styled.SelectItem>
    </Styled.SelectWrapper>
  )
}

export default SelectField
