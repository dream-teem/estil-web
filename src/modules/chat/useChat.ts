import chatApi from '@/services/chat/api'
import { useTypedSelector } from '@/store/store'

export const useChat = (id: string) => {
  const { isLoading } = chatApi.endpoints.getChat.useQuery(id, {
    skip: !id
  })

  const { messages: chatMessageMap, chatsMap } = useTypedSelector(
    state => state.chatSlice
  )

  return { chat: chatsMap[id], messages: chatMessageMap[id], isLoading }
}
