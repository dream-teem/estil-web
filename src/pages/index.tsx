import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import Home from '@/modules/static/home/Home'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const HomePage: AppNextPage = () => {
  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Explore"
          description="Buy and sell clothes"
          url={config.seo.meta.og.url}
        />
        <Home />
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'landing']))
  }
})

HomePage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}
export default HomePage
