import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import ProductSearch from '@/modules/products/routes/productSearch/ProductSearch'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

const ProductSearchPage: AppNextPage = () => {
  return (
    <Layout.Section>
      <Head title="Search" />
      <ProductSearch />
    </Layout.Section>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale, params, req }) => {
      //   await Promise.all(productApi.util.getRunningOperationPromises())

      return {
        props: {
          ...(await serverSideTranslations(locale!, ['common', 'product']))
        }
      }
    }
)

ProductSearchPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

export default ProductSearchPage
