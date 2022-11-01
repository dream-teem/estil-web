import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import Login from '@/modules/auth/routes/Login/Login'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: AppNextPage = () => {
  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Login"
          description="Buy and sell clothes"
          url={config.seo.meta.og.url + '/auth/login'}
        />
        <Login />
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

HomePage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
    </Layout>
  )
}
export default HomePage
