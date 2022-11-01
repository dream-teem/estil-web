import Button from '@/components/Elements/Button/Button'
import { Text } from '@/components/Typography/Text'
import { useTranslation } from 'next-i18next'
import React from 'react'
import Modal from '../Modal'
import * as Styled from './styles'

type Props = {
  onClose: () => void
  onConfirm: () => void
  explanation: string
  isShown?: boolean
}

function DeleteModal({
  onClose: onCancel,
  onConfirm,
  explanation,
  isShown
}: Props) {
  const { t } = useTranslation('common')

  return isShown ? (
    <Modal title={t('delete')} onClose={onCancel}>
      <Styled.ActionModalContent>
        <Text>{explanation}</Text>
        <Styled.ActionsWrapper>
          <Button
            className="action-button"
            variant="outline"
            onClick={onCancel}
          >
            {t('cancel')}
          </Button>
          <Button className="action-button" color="danger" onClick={onConfirm}>
            {t('delete')}
          </Button>
        </Styled.ActionsWrapper>
      </Styled.ActionModalContent>
    </Modal>
  ) : null
}

export default DeleteModal
