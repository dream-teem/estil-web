import CityDropdown from '@/components/CityDropdown/CityDropdown'
import { useCities } from '@/components/CityDropdown/useCities'
import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import SelectField from '@/components/Form/components/SelectField/SelectField'
import Form from '@/components/Form/Form'
import { Title } from '@/components/Typography/Title'
import { GetUserResponse } from '@/services/users/types'
import { yupResolver } from '@hookform/resolvers/yup'
import pick from 'lodash/pick'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import * as yup from 'yup'
import Avatar from './Avatar/Avatar'
import * as Styled from './styles'

export interface SettingsFormProps {
  user: GetUserResponse
  onSubmit: (product: FieldValues) => void
}

export type FieldValues = Pick<
  GetUserResponse,
  'picture' | 'name' | 'description' | 'cityId'
>

export const SettingsForm = ({ user, onSubmit }: SettingsFormProps) => {
  const { t } = useTranslation(['common', 'profile'])
  const { getCityById } = useCities()

  const schema = yup.object().shape({
    picture: yup
      .object()
      .shape({
        original: yup.string().required(),
        thumbnails: yup.object({
          75: yup.string().required(),
          150: yup.string().required(),
          428: yup.string().required()
        })
      })
      .optional()
      .nullable(),
    name: yup.string().optional().nullable(),
    description: yup.string().optional().nullable(),
    cityId: yup.number().nullable().optional()
  })

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: pick(user, 'picture', 'name', 'description', 'cityId'),
    resolver: yupResolver(schema)
  })
  const { control, formState, register } = methods
  console.log(formState.errors)
  return (
    <FormProvider {...methods}>
      <Styled.SettingsForm onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="picture"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <Avatar user={user} avatar={value} onChange={onChange} />
          )}
        />
        <Spacer variant="s" />
        <Title>{t('profile:name')}</Title>
        <Spacer variant="s" />
        <Form.InputField
          name="name"
          placeholder={t('profile:name.helper')}
          registration={register('name')}
          error={formState.errors.name}
          variant="outlined"
        />
        <Spacer variant="m" />
        <Title>{t('profile:description')}</Title>
        <Spacer variant="s" />
        <Form.InputField
          variant="outlined"
          name="description"
          placeholder={t('profile:description.helper')}
          registration={register('description')}
          error={formState.errors.description}
          multiline
        />
        <Spacer variant="m" />
        <Title>{t('common:cities')}</Title>
        <Spacer variant="s" />
        <Controller
          control={control}
          name="cityId"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectField
              value={value ? getCityById(value)?.name : ''}
              label={t('common:cities')}
              dropdown={
                <CityDropdown
                  active={value ? [value] : []}
                  onChange={city => onChange(city.id)}
                />
              }
            />
          )}
        />
        <Spacer variant="l" />
        <Button isLoading={false} fullWidth={true} type="submit">
          {t('common:save')}
        </Button>
      </Styled.SettingsForm>
    </FormProvider>
  )
}
