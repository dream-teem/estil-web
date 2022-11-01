import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import { saveToken } from '@/modules/auth/slice'
import EditProduct from '@/modules/products/routes/EditProduct/EditProduct'
import productApi from '@/services/products/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const ProductEditPage: AppNextPage = () => {
  const router = useRouter()

  const slug = router.query.slug as string

  const {
    data: product,
    isLoading,
    error
  } = productApi.endpoints.getProduct.useQuery(slug)

  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title="Edit Product"
          description="Buy and sell clothes"
          url={config.seo.meta.og.url + '/products/new'}
        />
        {isLoading && <FillContainerLoader />}
        {product && <EditProduct product={product} />}
        {error && <Error statusCode={500} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale, params, req }) => {
      store.dispatch(saveToken(req.cookies.access as string))

      const slug = params?.slug
      if (typeof slug === 'string') {
        store.dispatch(
          productApi.endpoints.getProduct.initiate(params!.slug as string)
        )
      }
      await Promise.all(productApi.util.getRunningOperationPromises())

      return {
        props: {
          ...(await serverSideTranslations(locale!, ['common', 'product']))
        }
      }
    }
)

ProductEditPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

ProductEditPage.auth = true

export default ProductEditPage
