import Layout from '@/components/Layout/Layout'
import { AppNextPage } from '@/types'
import Error from 'next/error'

const ErrorPage: AppNextPage = () => {
  return (
    <Layout.Container>
      <Layout.Section>
        <Error statusCode={404} />
      </Layout.Section>
    </Layout.Container>
  )
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
