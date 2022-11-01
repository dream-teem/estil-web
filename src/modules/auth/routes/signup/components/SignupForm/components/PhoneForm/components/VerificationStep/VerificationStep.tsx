import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { countryCodes } from '@/components/GenericForm/components/PhoneInputField/contants'
import PhoneInputField from '@/components/GenericForm/components/PhoneInputField/InputField'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import authApi from '@/services/auth/api'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { parseError } from 'src/shared/helpers/error'
import { FieldValues } from '../../../../SignupForm'
import { ErrorMessage } from '../../../ErrorMessage/ErrorMessage'

type Props = {
  onChange: (val: string) => void
}

function VerificationStep({ onChange }: Props) {
  const { t } = useTranslation('common')

  const [sendVerification, verificationResponse] =
    authApi.endpoints.sendVerification.useMutation()

  const {
    formState: { errors },
    setValue,
    watch,
    trigger
  } = useFormContext<Pick<FieldValues, 'phone'>>()

  const { phone: phoneData } = watch()

  const { phone, countryCode } = phoneData

  const handleSendVerification = async () => {
    const isValid = await trigger('phone.phone')
    if (isValid) {
      const { verificationId } = await sendVerification({
        phone,
        countryCode
      }).unwrap()
      onChange(verificationId)
    }
  }

  return (
    <>
      <Title variant="l">Номер телефона</Title>
      <Spacer variant="l" />
      <Text>
        Чтобы создать аккаунт, нам нужно верифицировать ваш номер телефона.
      </Text>
      <Spacer variant="l" />
      <PhoneInputField
        label="Номер телефона"
        value={{ phone, countryCode: countryCode as keyof typeof countryCodes }}
        onChange={({ countryCode, phone }) => {
          setValue('phone.countryCode', countryCode)
          setValue('phone.phone', phone)
        }}
        helper={'Введите свой номер телефона'}
        error={errors?.phone?.phone?.message}
      />
      {!errors?.phone?.phone?.message && verificationResponse.isError && (
        <ErrorMessage>
          {parseError(verificationResponse.error).message}
        </ErrorMessage>
      )}
      <Spacer />
      <Button
        fullWidth={true}
        type="button"
        onClick={handleSendVerification}
        isLoading={verificationResponse.isLoading}
      >
        {t('confirm')}
      </Button>
    </>
  )
}

export default VerificationStep
