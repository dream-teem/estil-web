/* eslint-disable react/jsx-key */
import ProgressBar from '@/components/ProgressBar/ProgressBar'
import { Text } from '@/components/Typography/Text'
import { yupResolver } from '@hookform/resolvers/yup'
import { ArrowBack } from '@styled-icons/ionicons-outline/ArrowBack'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import CompleteForm from './components/CompleteForm/CompleteForm'
import PhoneForm, {
  phoneVerificationSchema
} from './components/PhoneForm/PhoneForm'
import UserDetailsForm, {
  useDetailsSchema
} from './components/UserDetailsForm/UserDetailsForm'
import * as Styled from './styles'

export type FieldValues = {
  userDetails: {
    name: string
    email: string
    username: string
    password: string
    location: number
  }
  verificationId: string
  phone: {
    phone: string
    countryCode: string
  }
}

function SignupForm() {
  const [formStep, setFormStep] = useState(0)

  const schema = yup.object().shape({
    userDetails: useDetailsSchema,
    verificationId: yup.string().uuid().required(),
    phone: phoneVerificationSchema
  })

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: {
      userDetails: {},
      phone: {}
    },
    resolver: yupResolver(schema)
  })

  const getNext = (name: keyof FieldValues) => async () => {
    const isValid = await methods.trigger(name)
    if (isValid) setFormStep(formStep + 1)
  }

  const onPrev = () => setFormStep(formStep - 1)

  const forms = [
    <UserDetailsForm onNext={getNext('userDetails')} />,
    <PhoneForm onNext={getNext('verificationId')} />,
    <CompleteForm />
  ]

  const getCurrentForm = () => {
    const form = forms[formStep]

    return form ?? null
  }

  const canGoBack = formStep > 0

  const getProgress = () => {
    if (formStep === 0) return 0.2
    else if (formStep === 1) return 0.6
    else if (formStep === 2) return 0.8
    return 1
  }

  return (
    <FormProvider {...methods}>
      <Styled.SignupFormWrapper>
        <Styled.SignupFormHeader>
          {canGoBack && (
            <Styled.BackButton onClick={onPrev}>
              <ArrowBack className="back-icon" width={20} />
              <Text>Назад</Text>
            </Styled.BackButton>
          )}
          <ProgressBar className="progress-bar" progress={getProgress()} />
        </Styled.SignupFormHeader>
        <form onSubmit={e => e.preventDefault()}>{getCurrentForm()}</form>
      </Styled.SignupFormWrapper>
    </FormProvider>
  )
}

export default SignupForm
