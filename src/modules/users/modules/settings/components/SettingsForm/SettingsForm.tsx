import CityDropdown from '@/components/CityDropdown/CityDropdown'
import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import SelectField from '@/components/Form/components/SelectField/SelectField'
import Form from '@/components/Form/Form'
import { Title } from '@/components/Typography/Title'
import { GetUserResponse } from '@/services/users/types'
import { City } from '@/types/entities'
import { yupResolver } from '@hookform/resolvers/yup'
import isEmpty from 'lodash/isEmpty'
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
  'avatar' | 'name' | 'description'
> & {
  city?: City | null
}

export const SettingsForm = ({ user, onSubmit }: SettingsFormProps) => {
  const { t } = useTranslation(['common', 'profile'])
  const schema = yup.object().shape({
    avatar: yup
      .object()
      .shape({
        150: yup.string().required(),
        310: yup.string().required(),
        428: yup.string().required(),
        624: yup.string().required(),
        1280: yup.string().required()
      })
      .nullable(),
    name: yup.string().nullable(),
    description: yup.string().nullable(),
    city: yup
      .object()
      .shape({
        id: yup.number().required('Укажите город')
      })
      .nullable()
  })

  const methods = useForm<FieldValues>({
    mode: 'onBlur',
    defaultValues: pick(user, 'avatar', 'name', 'description', 'city'),
    resolver: yupResolver(schema)
  })
  const { control, formState, register } = methods
  return (
    <FormProvider {...methods}>
      <Styled.SettingsForm onSubmit={methods.handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="avatar"
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
          name="city"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <SelectField
              value={!isEmpty(value) ? value?.name : ''}
              label={t('common:cities')}
              dropdown={
                <CityDropdown
                  active={value ? [value.id] : []}
                  onChange={onChange}
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
