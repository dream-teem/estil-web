import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import Register from '@/modules/auth/routes/Register/Register'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'

const RegisterPage: AppNextPage = () => {
  const router = useRouter()
  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Register Page"
          description="Buy and sell clothes"
          url={config.seo.meta.og.url + '/auth/register'}
        />
        <Register />
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, [
      'common',
      'footer',
      'authorization'
    ]))
  }
})

RegisterPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Main>{page}</Layout.Main>
    </Layout>
  )
}
export default RegisterPage
