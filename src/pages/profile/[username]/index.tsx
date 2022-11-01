import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import { saveToken } from '@/modules/auth/slice'
import Profile from '@/modules/users/modules/profile/Profile'
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
  } = usersApi.endpoints.getUser.useQuery({
    username
  })

  if (error) return <Error statusCode={404} />

  if (isLoading) <FillContainerLoader />

  return (
    <Layout.Container>
      <Layout.Section>
        <Head
          title={username}
          url={`${config.seo.meta.og.url}/profile/${username}`}
        />
        {user && <Profile user={user} />}
      </Layout.Section>
    </Layout.Container>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale, params, req }) => {
      store.dispatch(saveToken(req.cookies.access as string))
      const username = params?.username

      if (typeof username === 'string') {
        store.dispatch(
          usersApi.endpoints.getUser.initiate({
            username: params!.username as string
          })
        )
      }
      await Promise.all(usersApi.util.getRunningOperationPromises())

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

ProfilePage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

export default ProfilePage
