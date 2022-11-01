import CityDropdown from '@/components/CityDropdown/CityDropdown'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { isEmpty } from 'lodash'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { FieldValues } from '../../ProductForm'
import SelectField from '../SelectField/SelectField'
import * as Styled from './styles'

export const getLocationSchema = () =>
  yup.object().shape({
    city: yup
      .object()
      .shape({
        id: yup.number().required('Укажите город')
      })
      .required()
  })

export const LocationForm = () => {
  const { formState, control, register, getValues, resetField } =
    useFormContext<Pick<FieldValues, 'location'>>()
  const { t } = useTranslation(['common', 'product'])
  const values = getValues()
  const errors = formState.errors.location

  return (
    <>
      <Title>{t('product:form.city')}</Title>
      <Controller
        control={control}
        name="location.city"
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <>
            <Styled.FieldRow>
              <Text>{t('common:cities')}</Text>
              <SelectField
                value={!isEmpty(value) ? value.name : t('common:select')}
                label={t('common:cities')}
                dropdown={
                  <CityDropdown
                    active={value ? [value.id] : []}
                    onChange={onChange}
                  />
                }
              />
            </Styled.FieldRow>
            <Styled.ErrorMessage>
              {errors?.city?.id?.message}
            </Styled.ErrorMessage>
          </>
        )}
      />
    </>
  )
}
