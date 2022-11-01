import { Spacer } from '@/components/Elements/Spacer/Spacer'
import { Text } from '@/components/Typography/Text'
import { Title } from '@/components/Typography/Title'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AuthContainer } from '../../components/Container/Container'
import LoginForm from './components/LoginForm/LoginForm'

function Login() {
  const { t } = useTranslation('authorization')
  const router = useRouter()

  return (
    <AuthContainer>
      <Title>{t('login')}</Title>
      <Spacer variant="l" />
      <LoginForm onSuccess={() => router.push('/')} />
      <Text>
        {t('haveNoAccount')} <Link href="/auth/signup">{t('register')}</Link>
      </Text>
    </AuthContainer>
  )
}

export default Login
