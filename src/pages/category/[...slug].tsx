import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import { useCategories } from '@/modules/products/hooks/useCategories'
import Products from '@/modules/products/Products'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import values from 'lodash/values'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const CategoryProductsPage: AppNextPage = () => {
  const router = useRouter()
  const slugs = router.query.slug as string[]
  const { categoryMap, isLoading } = useCategories()

  if (!router.isReady || isLoading) return <FillContainerLoader />

  const categoryPath = '/' + slugs.join('/')
  const category = values(categoryMap).find(c => c.path === categoryPath)

  if (!category) return <Error statusCode={404} />

  return (
    <Layout.Section>
      <Head
        title={slugs.slice(0, 2).join(' ')}
        url={`${config.seo.meta.og.url}/category/${categoryPath}`}
      />
      <Products />
    </Layout.Section>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale }) => {
      return {
        props: {
          ...(await serverSideTranslations(locale!, ['common', 'product']))
        }
      }
    }
)

CategoryProductsPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

export default CategoryProductsPage
