import Button from '@/components/Elements/Button/Button'
import Form from '@/components/Form/Form'
import InputField from '@/components/GenericForm/components/InputField/InputField'
import authApi from '@/services/auth/api'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import * as z from 'zod'

const schema = z.object({
  username: z.string().nonempty('Это поле обязательно'),
  password: z.string().nonempty('Пожалуйста, введите пароль')
})

type LoginValues = {
  username: string
  password: string
}

type LoginFormProps = {
  onSuccess: () => void
}

function LoginForm({ onSuccess }: LoginFormProps) {
  const [login, { isLoading }] = authApi.endpoints.login.useMutation()
  const router = useRouter()

  const { t } = useTranslation('authorization')

  return (
    <Form<LoginValues, typeof schema>
      onSubmit={(methods, handleErr) => async values => {
        const data = await login(values)
          .unwrap()
          .catch(err => handleErr(err?.data))
        if (data) {
          router.push(
            (router.query.redirectPage as string) || `/profile/${data.username}`
          )
        }
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <InputField
            label="Имя пользователя или почта"
            error={formState.errors.username?.message}
            registration={register('username')}
          />
          <InputField
            type="password"
            label="Пароль"
            error={formState.errors.password?.message}
            registration={register('password')}
          />
          <Button fullWidth={true} isLoading={isLoading} type="submit">
            {t('login')}
          </Button>
        </>
      )}
    </Form>
  )
}

export default LoginForm
