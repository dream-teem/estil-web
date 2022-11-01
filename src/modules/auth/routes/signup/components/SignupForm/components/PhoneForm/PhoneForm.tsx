import { countryCodes } from '@/components/GenericForm/components/PhoneInputField/contants'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import 'yup-phone'
import { FieldValues } from '../../SignupForm'
import ConfirmStep from './components/ConfirmStep/ConfirmStep'
import VerificationStep from './components/VerificationStep/VerificationStep'

type Props = {
  onNext?: () => void
}

export const phoneVerificationSchema = yup
  .object()
  .shape({
    phone: yup
      .string()
      .phone(undefined, true, 'Введите валидный номер телефона')
      .required('Введите валидный номер телефона')
      .default(''),
    countryCode: yup.string().default('KZ')
  })
  .optional()

function PhoneForm({ onNext }: Props) {
  const [verificationId, setVerificationId] = useState<string | null>(null)
  const { setValue, resetField, watch } =
    useFormContext<Pick<FieldValues, 'verificationId' | 'phone'>>()

  const handleVerificationResponse = (verificationId: string) => {
    setVerificationId(verificationId)
  }

  const handleResetVerification = () => {
    setVerificationId(null)
    resetField('verificationId')
  }

  const isInConfirm = !!verificationId

  const { phone } = watch()

  return (
    <>
      {!isInConfirm && (
        <VerificationStep onChange={handleVerificationResponse} />
      )}
      {isInConfirm && (
        <ConfirmStep
          phone={
            countryCodes[phone.countryCode as keyof typeof countryCodes].code +
            phone.phone
          }
          verificationId={verificationId}
          resetVerification={handleResetVerification}
          onSuccess={() => {
            setValue('verificationId', verificationId)
            onNext?.()
          }}
        />
      )}
    </>
  )
}

export default PhoneForm
