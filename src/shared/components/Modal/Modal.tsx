import { ArrowBack } from '@styled-icons/ionicons-outline/ArrowBack'
import { Close } from '@styled-icons/ionicons-outline/Close'
import React from 'react'
import ActionHeader from '../ActionHeader/ActionHeader'
import * as Styled from './styles'

type Props = {
  title: string
  children: React.ReactNode
  onClose?: () => void
  footerButton?: React.ReactNode
  onBack?: () => void
}

function Modal({ title, children, onClose, onBack, footerButton }: Props) {
  return (
    <Styled.ModalBackdrop onClick={onClose}>
      <Styled.ModalWrapper onClick={e => e.stopPropagation()}>
        <Styled.ModalHeader>
          <ActionHeader
            leftButton={
              onBack && <ArrowBack width={24} onClick={() => onBack()} />
            }
            title={title}
            rightButton={<Close width={28} onClick={() => onClose?.()} />}
          />
        </Styled.ModalHeader>
        <Styled.ModalContentWrapper>{children}</Styled.ModalContentWrapper>
        {footerButton && (
          <Styled.ModalFooter>{footerButton}</Styled.ModalFooter>
        )}
      </Styled.ModalWrapper>
      <Styled.RemoveScrollGlobalStyle />
    </Styled.ModalBackdrop>
  )
}

Modal.Header = Styled.ModalHeader
Modal.Footer = Styled.ModalFooter

export default Modal
