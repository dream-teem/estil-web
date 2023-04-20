import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { LoadingSpinner } from '@/components/Loader/FillContainerLoader/styles'
import { config } from '@/config'
import chatApi from '@/services/chat/api'
import usersApi from '@/services/users/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const ChatPage: AppNextPage = () => {
  const router = useRouter()
  const [createChat, { isLoading, error }] =
    chatApi.endpoints.createChat.useMutation()

  const username = router.query.username as string

  const userId = Number(router.query.sellerId)
  const productId = Number(router.query.productId)

  const isInvalidArgument = isNaN(userId) || isNaN(productId)

  useEffect(() => {
    if (!isInvalidArgument) {
      const request = createChat({ userId, productId })

      request
        .unwrap()
        .then(chat => {
          router.push({
            pathname: `/chat`,
            query: {
              chatId: chat._id
            }
          })
        })
        .catch()

      return () => request.abort()
    }
  }, [createChat, isInvalidArgument, router, userId, productId])

  if (isInvalidArgument) {
    return <Error statusCode={404} />
  }

  if (error) return <Error statusCode={500} />

  if (error) return <Error statusCode={500} />

  if (isLoading) <FillContainerLoader />

  return (
    <Layout.Container>
      <Layout.Section>
        <Head title={username} url={`${config.seo.meta.og.url}/chat/init`} />
        <LoadingSpinner />
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

ChatPage.getLayout = function (page) {
  return (
    <Layout>
      <Layout.Header />
      <Layout.Main>{page}</Layout.Main>
      <Layout.Footer />
    </Layout>
  )
}

ChatPage.auth = true

export default ChatPage
