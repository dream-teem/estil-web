import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import Signup from '@/modules/auth/routes/signup/Signup'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

const SignupPage: AppNextPage = () => {
  const router = useRouter()
  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Регистрация"
          description="Начни продавать свои вещи сегодня"
          url={config.seo.meta.og.url + '/auth/signup'}
        />
        <Signup />
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'authorization']))
  }
})

SignupPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Main>{page}</Layout.Main>
    </Layout>
  )
}
export default SignupPage
