import Button from '@/components/Elements/Button/Button'
import { Spacer } from '@/components/Elements/Spacer/Spacer'
import Form from '@/components/Form/Form'
import authApi from '@/services/auth/api'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import * as z from 'zod'

const schema = z.object({
  phone: z.string().nonempty('Phone is required'),
  username: z
    .string()
    .nonempty('Username is required')
    .min(4, 'Username must container at least 4 letters'),
  email: z
    .string()
    .nonempty('Email is required')
    .email('Invalid email address'),
  password: z.string().nonempty('Password is required')
})

type RegisterValues = {
  phone: string
  email: string
  password: string
  username: string
}

type RegisterFormProps = {
  onSuccess: () => void
}

function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [register, { isLoading }] = authApi.endpoints.register.useMutation()
  const { t } = useTranslation('authorization')
  const dispatch = useDispatch()
  const router = useRouter()

  return (
    <Form<RegisterValues, typeof schema>
      onSubmit={(methods, handleErr) => async values => {
        // const data = await register(values)
        //   .unwrap()
        //   .catch(err => handleErr(err?.data))
        // if (data) {
        //   router.push(
        //     (router.query.redirectPage as string) || `/profile/${data.username}`
        //   )
        // }
      }}
      schema={schema}
    >
      {({ register, formState }) => (
        <>
          <Form.InputField
            placeholder="+77770000000"
            label="Phone"
            error={formState.errors['phone']}
            registration={register('phone')}
          />
          <Spacer variant="m" />
          <Form.InputField
            label="Username"
            error={formState.errors['username']}
            registration={register('username')}
          />
          <Spacer variant="m" />
          <Form.InputField
            label="Email"
            placeholder="example@gmail.com"
            error={formState.errors['email']}
            registration={register('email')}
          />
          <Spacer variant="m" />
          <Form.InputField
            type="password"
            label="Password"
            error={formState.errors['password']}
            registration={register('password')}
          />
          <Spacer variant="m" />
          <Button fullWidth={true} isLoading={isLoading}>
            {t('register')}
          </Button>
        </>
      )}
    </Form>
  )
}

export default RegisterForm
