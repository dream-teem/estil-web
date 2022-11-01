import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import InputField from '@/components/GenericForm/components/InputField/InputField'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import authApi from '@/services/auth/api'
import { yupResolver } from '@hookform/resolvers/yup'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { parseError } from 'src/shared/helpers/error'
import * as yup from 'yup'
import { ErrorMessage } from '../../../ErrorMessage/ErrorMessage'
import * as Styled from './styles'

type Props = {
  verificationId: string
  onSuccess: () => void
  resetVerification: () => void
  phone: string
}

export type FieldValues = {
  smsCode: string
}

function ConfirmStep({
  verificationId,
  onSuccess,
  resetVerification,
  phone
}: Props) {
  const { t } = useTranslation('common')

  const [confirmVerification, confirmResponse] =
    authApi.endpoints.confirmVerification.useMutation()

  const schema = yup.object().shape({
    smsCode: yup.string().length(6, 'Введите код из 6 цифер')
  })

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    resolver: yupResolver(schema)
  })
  const {
    formState: { errors },
    register,
    watch,
    trigger
  } = methods

  const { smsCode } = watch()

  const handleConfirm = async () => {
    const isValid = await trigger('smsCode')
    if (isValid) {
      const { isVerified } = await confirmVerification({
        verificationId,
        smsCode
      }).unwrap()
      if (isVerified) onSuccess()
    }
  }

  return (
    <>
      <Title variant="l">Получили код?</Title>
      <Spacer />
      <Text color="disabled">
        Мы отправили вам 6 значный код подтверждения на {phone}. Введите его
        ниже
      </Text>
      <Spacer />
      <InputField
        label="Смс код"
        name="smsCode"
        error={errors.smsCode?.message}
        registration={register('smsCode')}
        helper="Введите код подтверждения который придет вам на телефон"
      />
      <Spacer />
      <Button
        fullWidth={true}
        type="button"
        onClick={handleConfirm}
        isLoading={confirmResponse.isLoading}
      >
        {t('confirm')}
      </Button>
      <Spacer />

      {confirmResponse.isError && (
        <ErrorMessage>{parseError(confirmResponse.error).message}</ErrorMessage>
      )}
      <Styled.HelperMessageWrapper>
        Не получили код?&nbsp;
        <Styled.HelperButton type="button" onClick={resetVerification}>
          Проверить номер телефона
        </Styled.HelperButton>
      </Styled.HelperMessageWrapper>
    </>
  )
}

export default ConfirmStep
