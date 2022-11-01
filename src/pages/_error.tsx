import Layout from '@/components/Layout/Layout'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'

const ErrorPage: AppNextPage = ({ statusCode, ...props }: any) => {
  return (
    <Layout.Container>
      <Layout.Section>
        <Error statusCode={statusCode} />
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common']))
  }
})

export const getInitialProps = ({ res, err }: any) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

ErrorPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
    </Layout>
  )
}

export default ErrorPage
