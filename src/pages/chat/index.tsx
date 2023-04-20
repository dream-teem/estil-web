import Head from '@/components/Head/Head'
import Layout from '@/components/Layout/Layout'
import FillContainerLoader from '@/components/Loader/FillContainerLoader/FillContainerLoader'
import { config } from '@/config'
import { useAuth } from '@/hooks/useAuth'
import { ChatBox } from '@/modules/chat/components/Chat'
import chatApi from '@/services/chat/api'
import { wrapper } from '@/store/store'
import { AppNextPage } from '@/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Error from 'next/error'
import { useRouter } from 'next/router'

const ChatPage: AppNextPage = () => {
  const router = useRouter()
  const { user } = useAuth()

  const chatId = router.query.chatId as string
  const {
    data: chats = [],
    isLoading,
    error
  } = chatApi.endpoints.getChats.useQuery(null)

  if (error) return <Error statusCode={500} />

  if (isLoading) return <FillContainerLoader />

  return (
    <Layout.Section style={{ flex: 1, overflow: 'hidden' }}>
      <Head title={'Chat'} url={`${config.seo.meta.og.url}/chat`} />
      {user && chats && <ChatBox user={user} chatId={chatId} />}
    </Layout.Section>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
    async ({ locale }) => {
      store.dispatch(chatApi.endpoints.getChats.initiate(null))

      await Promise.all(chatApi.util.getRunningOperationPromises())

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
      <Layout.Header desktopHeader={false} />
      <Layout.Main style={{ flex: 1, display: 'flex' }}>{page}</Layout.Main>
    </Layout>
  )
}

ChatPage.auth = true

export default ChatPage
