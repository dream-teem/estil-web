import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import authApi from '@/services/auth/api'
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { parseError } from 'src/shared/helpers/error'
import { FieldValues } from '../../SignupForm'
import { ErrorMessage } from '../ErrorMessage/ErrorMessage'
import * as Styled from './styles'

function CompleteForm() {
  const router = useRouter()
  const [register, { isLoading, error, isError, data }] =
    authApi.endpoints.register.useMutation()

  const { handleSubmit } =
    useFormContext<Pick<FieldValues, 'userDetails' | 'verificationId'>>()

  const onSubmit = async ({
    userDetails: { location, ...userData },
    verificationId
  }: Pick<FieldValues, 'userDetails' | 'verificationId'>) => {
    const response = await register({
      ...userData,
      verificationId,
      cityId: location
    }).unwrap()

    router.push(`/profile/${response.username}`)
  }
  console.log(error, 'erorrosjldfjlsdkfj')
  return (
    <>
      <Title variant="l">Завершите регистрацию</Title>
      <Spacer variant="l" />
      <Text>
        Estil.kz - социальная сеть где ты можешь дать своей одежде вторую жизнь.
        Создай аккаунт и начни продавать и покупать безопасно.
      </Text>
      <Spacer variant="l" />
      <Text variant="s">
        Нажимая «Создать аккаунт», вы принимаете{' '}
        <Styled.HelperButton>
          <Link href="/terms-and-conditions">
            «Правила использования сайта».
          </Link>
        </Styled.HelperButton>
      </Text>
      <Spacer />
      <Button
        fullWidth={true}
        onClick={handleSubmit(onSubmit)}
        isLoading={isLoading}
      >
        Создать аккаунт
      </Button>
      <Spacer />
      {isError && <ErrorMessage>{parseError(error).message}</ErrorMessage>}{' '}
      &nbsp;
      {isError && (error as FetchBaseQueryError).status === 409 && (
        <Styled.HelperButton>
          <Link href="/auth/login">Войти?</Link>
        </Styled.HelperButton>
      )}
    </>
  )
}

export default CompleteForm
