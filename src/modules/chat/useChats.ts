import { config } from '@/config'
import chatApi from '@/services/chat/api'
import { useTypedDispatch, useTypedSelector } from '@/store/store'
import { useEffect, useRef } from 'react'
import { io, Socket } from 'socket.io-client'
import { AuthUser } from '../auth/types'
import { addMessage, markRead } from './slice'
import {
  ChatEmitEvent,
  ChatEvent,
  ChatExceptionPayload,
  ChatMarkedReadPayload,
  ChatNewMessagePayload,
  MarkChatReadPayload,
  SendMessagePayload,
  TypingMessagePayload
} from './types'

export const useChats = (user?: AuthUser, currentChatId?: string) => {
  const { isLoading } = chatApi.endpoints.getChats.useQuery(null)
  const { chats } = useTypedSelector(state => state.chatSlice)

  const dispatch = useTypedDispatch()
  const socketRef = useRef<Socket>()

  useEffect(() => {
    socketRef.current = io(config.api.socket.baseUrl!, {
      autoConnect: true,
      query: {
        token: user?.token
      }
    })

    socketRef.current.on(
      ChatEvent.NEW_MESSAGE,
      (newMessage: ChatNewMessagePayload) => {
        dispatch(addMessage(newMessage))

        if (currentChatId === newMessage.chatId) {
          markChatRead({
            chatId: newMessage.chatId,
            senderId: newMessage.message.userId
          })
        }
      }
    )

    socketRef.current.on(
      ChatEvent.MESSAGE_SENT,
      (data: ChatNewMessagePayload) => {
        dispatch(addMessage(data))
      }
    )

    socketRef.current.on(ChatEvent.MARK_READ, (data: ChatMarkedReadPayload) => {
      dispatch(markRead(data))
    })

    socketRef.current.on(ChatEvent.EXCEPTION, (data: ChatExceptionPayload) => {
      console.error(data.message, data.status)
    })

    socketRef.current.on('connect', () => {
      console.log('connect to socket')
    })
    socketRef.current.on('disconnect', () =>
      console.log('disconnect to socket')
    )

    return () => {
      socketRef.current?.close()
    }
  }, [currentChatId])

  const sendMessage = (data: SendMessagePayload) => {
    socketRef.current?.emit(ChatEmitEvent.SEND_MESSAGE, data)
  }

  const emitTypingMessage = (data: TypingMessagePayload) => {
    socketRef.current?.emit(ChatEmitEvent.TYPING_MESSAGE, data)
  }

  const markChatRead = (data: MarkChatReadPayload) => {
    socketRef.current?.emit(ChatEmitEvent.MARK_READ, data)
  }

  return {
    chats,
    isLoading,
    socket: socketRef.current,
    markChatRead,
    emitTypingMessage,
    sendMessage,
    connected: socketRef.current?.connected
  }
}
