import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import * as z from 'zod'
import { AuthContainer } from '../../components/Container/Container'
import RegisterForm from './components/RegisterForm/RegisterForm'

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

function Register() {
  const { t } = useTranslation('authorization')
  const router = useRouter()

  return (
    <AuthContainer>
      <Title>{t('register')}</Title>
      <Spacer variant="l" />
      <RegisterForm onSuccess={() => router.push('/')} />
      <Text>
        {t('haveAccount')} <Link href="/auth/login">{t('login')}</Link>
      </Text>
    </AuthContainer>
  )
}

export default Register
