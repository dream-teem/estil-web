import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import UserSettings from '@/modules/users/modules/settings/Settings'
import usersApi from '@/services/users/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const ProfilePage: AppNextPage = () => {
  const router = useRouter()

  const username = router.query.username as string
  const {
    data: user,
    isLoading,
    error
  } = usersApi.endpoints.getProfile.useQuery(null)

  if (error) return <Error statusCode={500} />

  if (isLoading) <FillContainerLoader />

  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title={username}
          url={`${config.seo.meta.og.url}/profile/${username}`}
        />
        {user && <UserSettings user={user} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale }) => {
      store.dispatch(usersApi.endpoints.getProfile.initiate(null))

      await Promise.all(usersApi.util.getRunningOperationPromises())

      return {
        props: {
          ...(await serverSideTranslations(locale!, ['common', 'profile']))
        }
      }
    }
)

ProfilePage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

ProfilePage.auth = true

export default ProfilePage
