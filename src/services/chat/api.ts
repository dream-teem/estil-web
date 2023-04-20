import { Chat, ChatMessage } from '@/modules/chat/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '..'
import { CreateChatRequest, CreateChatResponse, UserChat } from './types'

export const CHAT_API_REDUCER_KEY = 'chatApi'

const chatApi = createApi({
  reducerPath: CHAT_API_REDUCER_KEY,
  baseQuery,
  endpoints: builder => ({
    getChats: builder.query<UserChat[], null>({
      query: () => ({
        url: 'chats',
        method: 'GET'
      })
    }),
    getChat: builder.query<Chat, string>({
      query: chatId => ({
        url: `chats/${chatId}`,
        method: 'GET'
      })
    }),
    createChat: builder.mutation<CreateChatResponse, CreateChatRequest>({
      query: body => ({
        url: 'chats',
        method: 'POST',
        body
      })
    }),
    getChatMessages: builder.query<ChatMessage[], string>({
      query: id => ({
        url: `chats/${id}/messages`,
        method: 'GET'
      })
      // async onCacheEntryAdded(
      //   arg,
      //   { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      // ) {
      //   const socket = io(config.api.socket.baseUrl + 'chat', {
      //     withCredentials: true
      //   })
      //   try {
      //     // wait for the initial query to resolve before proceeding
      //     await cacheDataLoaded

      //     socket.on(ChatEvent.EXCEPTION, (data: ChatExceptionPayload) => {
      //       alert(data.message)
      //     })
      //     socket.on(ChatEvent.NEW_MESSAGE, (data: ChatNewMessagePayload) => {
      //       updateCachedData(draft => {
      //         draft.push(data.message)
      //       })
      //     })
      //   } catch {
      //     // no-op in case `cacheEntryRemoved` resolves before `cacheDataLoaded`,
      //     // in which case `cacheDataLoaded` will throw
      //   }
      //   // cacheEntryRemoved will resolve when the cache subscription is no longer active
      //   await cacheEntryRemoved
      //   // perform cleanup steps once the `cacheEntryRemoved` promise resolves
      //   socket.close()
      // }
    })
  })
})

export default chatApi
