import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import CreateProduct from '@/modules/products/routes/CreateProduct/CreateProduct'
import { AppNextPage } from '@/types'
import type { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ProductCreatePage: AppNextPage = () => {
  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Create Product"
          description="Buy and sell clothes"
          url={config.seo.meta.og.url + '/products/new'}
        />
        <CreateProduct />
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'product']))
  }
})

ProductCreatePage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}
ProductCreatePage.auth = true
export default ProductCreatePage
