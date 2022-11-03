import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import ProductDetail from '@/modules/products/routes/productDetail/ProductDetail'
import productApi from '@/services/products/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const ProductDetailPage: AppNextPage = () => {
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
          title={product?.description.slice(0, 150)}
          description={product?.description}
          url={`${config.seo.meta.og.url}/products/${slug}`}
        />
        {product && <ProductDetail product={product} />}
        {isLoading && <FillContainerLoader />}
        {error && <Error statusCode={404} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale, params }) => {
      const slug = params?.slug
      if (typeof slug === 'string') {
        store.dispatch(
          productApi.endpoints.getProduct.initiate(params!.slug as string)
        )
      }
      await Promise.all(productApi.util.getRunningOperationPromises())

      return {
        props: {
          ...(await serverSideTranslations(locale!, [
            'common',
            'profile',
            'product'
          ]))
        }
      }
    }
)

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
