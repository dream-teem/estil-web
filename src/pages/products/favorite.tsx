import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import { useAuth } from '@/hooks/useAuth'
import FavoriteProducts from '@/modules/products/routes/favoriteProducts/FavoriteProducts'
import productApi from '@/services/products/api'
import { AppNextPage } from '@/types'
import { GetStaticProps } from 'next'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'

const FavoriteProductsPage: AppNextPage = () => {
  const { t } = useTranslation('product')
  const { user } = useAuth()
  // todo: fix pagination
  const { data, isLoading, error } =
    productApi.endpoints.getShopProducts.useQuery(
      { userId: user?.id || 0, isLiked: true, limit: 100, offset: 0 },
      { skip: !user }
    )

  if (error) return <Error statusCode={500} />

  if (isLoading) <FillContainerLoader />

  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title={t('favoriteItems')}
          url={`${config.seo.meta.og.url}/products/favorite`}
        />
        {data?.products && <FavoriteProducts products={data?.products} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale!, ['common', 'product']))
  }
})

FavoriteProductsPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

FavoriteProductsPage.auth = true

export default FavoriteProductsPage
