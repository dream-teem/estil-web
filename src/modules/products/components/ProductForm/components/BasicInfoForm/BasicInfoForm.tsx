import Form from '@/components/Form/Form'
import { Title } from '@/components/Typography/Title'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { FieldValues } from '../../ProductForm'

export const getBasicInfoSchema = () =>
  yup.object().shape({
    description: yup.string().required('Напишите описание')
  })

export const BasicInfoForm = () => {
  const { t } = useTranslation('product')
  const { formState, register } =
    useFormContext<Pick<FieldValues, 'basicInfo'>>()

  return (
    <>
      <Title>{t('form.description')}</Title>
      <Form.InputField
        name="basicInfo.description"
        placeholder={t('form.description.helper')}
        registration={register('basicInfo.description')}
        error={formState.errors.basicInfo?.description}
        multiline
      />
    </>
  )
}
