import chatApi from '@/services/chat/api'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  ChatMarkedReadPayload,
  ChatNewMessagePayload,
  ChatState
} from './types'

const initialState: ChatState = {
  messages: {},
  chats: [],
  chatsMap: {}
}

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    addMessage(
      state,
      { payload: { chatId, message } }: PayloadAction<ChatNewMessagePayload>
    ) {
      if (chatId in state.messages) {
        state.messages[chatId].push(message)
      }

      if (chatId in state.chatsMap) {
        const { members } = state.chatsMap[chatId]

        const updatedMembers = members.map(member => {
          if (member.userId === message.userId) {
            return {
              ...member,
              lastReadTimestamp: message.timestamp
            }
          }
          return member
        })

        state.chatsMap[chatId].members = updatedMembers
      }

      const chatIndex = state.chats.findIndex(chat => chat._id === chatId)

      if (chatIndex !== -1) {
        state.chats[chatIndex].lastMessageTimestamp = message.timestamp
        state.chats[chatIndex].lastMessageText = message.text
      }
    },
    markRead(
      state,
      {
        payload: { chatId, userId, lastReadTimestamp }
      }: PayloadAction<ChatMarkedReadPayload>
    ) {
      if (chatId in state.chatsMap) {
        const { members } = state.chatsMap[chatId]

        const updatedMembers = members.map(member => {
          if (member.userId === userId) {
            return {
              ...member,
              lastReadTimestamp: lastReadTimestamp
            }
          }
          return member
        })

        state.chatsMap[chatId].members = updatedMembers
      }
    }
  },
  extraReducers: builder => {
    builder.addMatcher(
      chatApi.endpoints.getChat.matchFulfilled,
      (state, { payload }) => {
        state.messages[payload._id] = payload.messages
        state.chatsMap[payload._id] = payload
      }
    ),
      builder.addMatcher(
        chatApi.endpoints.getChats.matchFulfilled,
        (state, { payload: chats }) => {
          state.chats = chats
          chats.forEach(chat => {
            if (!state.messages[chat._id]) {
              state.messages[chat._id] = []
            }
          })
        }
      )
  }
})

export const chatReducer = chatSlice.reducer

export const { addMessage, markRead } = chatSlice.actions
