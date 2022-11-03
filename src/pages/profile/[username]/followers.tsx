import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import Followers from '@/modules/users/modules/profile/routes/followers/Followers'
import usersApi from '@/services/users/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const FollowersPage: AppNextPage = () => {
  const router = useRouter()

  const username = router.query.username as string

  const {
    data: users,
    isLoading,
    error
  } = usersApi.endpoints.getFollowers.useQuery(username)

  if (error) return <Error statusCode={404} />

  if (isLoading) <FillContainerLoader />

  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title={`${username} followers`}
          url={`${config.seo.meta.og.url}/profile/${username}/followers`}
        />
        {users && <Followers followers={users} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale, params }) => {
      const username = params?.username

      if (typeof username === 'string') {
        store.dispatch(
          usersApi.endpoints.getFollowers.initiate(params!.username as string)
        )
      }
      await Promise.all(usersApi.util.getRunningOperationPromises())

      return {
        props: {
          ...(await serverSideTranslations(locale!, ['common']))
        }
      }
    }
)

FollowersPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

export default FollowersPage
