import { User } from '@/modules/users/types'
import { useTypedSelector } from '@/store/store'
import moment from 'moment'
import React, { useEffect, useMemo } from 'react'
import { MessageList } from 'react-chat-elements'
import { Chat } from '../../types'

type Props = {
  chat: Chat
  user: User
  scrollToLastMessage: () => void
}

export function ChatMessageList({ chat, user, scrollToLastMessage }: Props) {
  const messageListReferance = React.createRef<MessageList>()
  const { messages: chatMessageMap } = useTypedSelector(
    state => state.chatSlice
  )

  const dataSource: any = useMemo(() => {
    const messages = chatMessageMap[chat._id] || []

    return messages.map((message, index) => {
      const isOwn = message.userId === user.id
      const member = chat.members.find(member => member.userId !== user.id)

      const isReadByUser = member?.lastReadTimestamp
        ? moment(member?.lastReadTimestamp).isAfter(moment(message.timestamp))
        : false

      const isLast = index === messages.length - 1
      return {
        position: isOwn ? 'right' : 'left',
        type: 'text',
        text: message.text,
        date: new Date(message.timestamp),
        id: message.id,
        color: 'white',
        status: !isOwn || isReadByUser ? 'read' : 'sent',
        className: isOwn ? 'is-own' : '',
        focus: isLast
      }
    })
  }, [chat, user, chatMessageMap])

  useEffect(() => {
    scrollToLastMessage()
  }, [dataSource])

  return (
    <MessageList
      // this is needed.
      onMessageFocused={console.log}
      referance={messageListReferance}
      lockable={true}
      toBottomHeight={'100%'}
      dataSource={dataSource}
      className="message-list"
    />
  )
}
