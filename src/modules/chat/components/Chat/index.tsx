import { useAuth } from '@/hooks/useAuth'
import useBreakpoint from '@/hooks/useBreakpoint'
import { User } from '@/modules/users/types'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useRef } from 'react'
import { ChatList } from 'react-chat-elements'
import 'react-chat-elements/dist/main.css'
import { ChatMember } from '../../types'
import { useChat } from '../../useChat'
import { useChats } from '../../useChats'
import { ChatContainer } from '../Container/Container'
import { ChatMessageInput } from './MessageInput'
import { ChatMessageList } from './MessageList'
import * as Styled from './styles'

type Props = {
  chatId?: string
  user: User
}
export const ChatBox = ({ chatId, user }: Props) => {
  const { authUser } = useAuth()
  const { chats, sendMessage, markChatRead, connected } = useChats(
    authUser!,
    chatId
  )

  const messageListRef = useRef<any>()
  const router = useRouter()

  const currentChatId = chatId
  const { chat } = useChat(currentChatId!)

  const setChat = (chatId: string) => {
    router.replace({
      pathname: router.pathname,
      query: {
        chatId
      }
    })
  }

  useEffect(() => {
    if (currentChatId && chat && connected) {
      const sender = chat.members.find(member => member.userId !== user?.id)
      if (sender)
        markChatRead({ chatId: currentChatId, senderId: sender.userId })
    }
  }, [currentChatId, connected])

  const dataSource = useMemo(() => {
    return chats.map(chat => {
      const date = chat.lastMessageTimestamp
        ? new Date(chat.lastMessageTimestamp)
        : new Date()

      const member = chat.members.find(
        member => member.userId !== user.id
      ) as ChatMember

      return {
        id: chat._id,
        avatar:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU23_llQriOAO4-AmaA2eZggLwhMH769sg46oed4x3mrlZv9A9WRgczkaOK-4YCpFTLIg&usqp=CAU',
        title: member.username,
        subtitle: chat.lastMessageText || 'No message yet',
        date,
        unread: 0,
        className: chatId === chat._id ? 'current-chat' : ''
      }
    })
  }, [chats, chatId])

  const scrollToLastMessage = () => {
    const container = messageListRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }

  const breakpoint = useBreakpoint()

  const isPhone = breakpoint === 'xs' || breakpoint === 'sm'
  const showChats = !isPhone || !chat
  const showChat = !isPhone || chat
  return (
    <ChatContainer>
      {showChats && (
        <Styled.ChatMessagesContainer isPhone={isPhone}>
          <ChatList
            id="chat-list"
            onClick={data => setChat(data.id as string)}
            lazyLoadingImage=""
            dataSource={dataSource}
          />
        </Styled.ChatMessagesContainer>
      )}
      {showChat && (
        <Styled.ChatContentContainer>
          <Styled.ChatMessageListContainer ref={messageListRef}>
            {chat && (
              <ChatMessageList
                chat={chat}
                user={user}
                scrollToLastMessage={scrollToLastMessage}
              />
            )}
          </Styled.ChatMessageListContainer>
          {chat && (
            <ChatMessageInput chat={chat} user={user} onSend={sendMessage} />
          )}
        </Styled.ChatContentContainer>
      )}
    </ChatContainer>
  )
}
