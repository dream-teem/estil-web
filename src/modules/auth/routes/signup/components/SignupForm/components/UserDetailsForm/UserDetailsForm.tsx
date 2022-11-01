import { useCities } from '@/components/CityDropdown/useCities'
import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import InputField from '@/components/GenericForm/components/InputField/InputField'
import SelectField from '@/components/GenericForm/components/SelectField/SelectField'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import authApi from '@/services/auth/api'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import * as yup from 'yup'
import { FieldValues } from '../../SignupForm'

export const useDetailsSchema = yup.object().shape({
  name: yup.string().required('Заполните имя'),
  email: yup
    .string()
    .email('Введите валидную электронную почту')
    .required('Заполните электронную почту'),
  username: yup.string().required('Заполните имя пользователя'),
  password: yup
    .string()
    .min(8, 'Пароль должен содержать не менее 8 символов.')
    .required('Пожалуйста, введите пароль'),
  location: yup.number().typeError('Укажите город').required('Укажите город')
})

type Props = {
  onNext?: () => void
}

function UserDetailsForm({ onNext }: Props) {
  const { t } = useTranslation('common')

  const {
    formState: {
      errors: { userDetails: errors }
    },
    register,
    watch
  } = useFormContext<Pick<FieldValues, 'userDetails'>>()

  const { userDetails: values } = watch()
  const { cities } = useCities()

  const [trigger, result, lastPromiseInfo] =
    authApi.endpoints.checkUsername.useLazyQuery()

  return (
    <>
      <Title variant="l">Вступите в Estil.kz</Title>
      <Spacer />
      <Text color="disabled">
        Введите несколько деталей о вас чтобы создать аккаунт и начать продавать
        и покупать
      </Text>
      <Spacer />
      <Title>Ваши детали</Title>
      <Spacer />
      <InputField
        label="Ваше имя"
        registration={register('userDetails.name')}
        error={errors?.name?.message}
      />
      <InputField
        label="Электронная почта"
        registration={register('userDetails.email')}
        type="email"
        error={errors?.email?.message}
      />
      <Spacer />

      <Title>Придумайте имя пользователя и пароль</Title>
      <Spacer />
      <InputField
        label="Имя пользователя"
        registration={register('userDetails.username')}
        onBlur={val => trigger(val)}
        error={
          errors?.username?.message ||
          (result.error && 'Имя пользователя занят, выберите другой')
        }
      />
      <Spacer />
      <InputField
        label="Пароль"
        autoComplete="new-password"
        registration={register('userDetails.password')}
        type="password"
        helper="Пароль должен содержать не менее 8-ми символов"
        error={errors?.password?.message}
      />
      <Spacer />
      <Title>Местоположение</Title>
      <Spacer />
      <SelectField
        label="Город"
        registration={register('userDetails.location')}
        value={values?.location}
        error={errors?.location?.message}
        options={cities.map(c => ({ label: c.name, value: c.id }))}
      />
      <Spacer />

      {onNext && (
        <Button
          fullWidth
          onClick={onNext}
          isLoading={result.isLoading}
          disabled={result.isError}
        >
          {t('next')}
        </Button>
      )}
    </>
  )
}

export default UserDetailsForm
