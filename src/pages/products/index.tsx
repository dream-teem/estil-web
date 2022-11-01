import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import { config } from '@/config'
import Products from '@/modules/products/Products'
import { AppNextPage } from '@/types'
import { GetStaticProps } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ProductDetailPage: AppNextPage = () => {
  return (
    <Layout.Section>
      <Head title="Explore" url={`${config.seo.meta.og.url}/products`} />
      <Products />
    </Layout.Section>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'product']))
  }
})

ProductDetailPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

export default ProductDetailPage
