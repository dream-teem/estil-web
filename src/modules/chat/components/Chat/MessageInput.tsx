import Button from '@/components/Elements/Button/Button'
import { User } from '@/modules/users/types'
import React, { KeyboardEvent } from 'react'
import { Input } from 'react-chat-elements'
import { Chat, SendMessagePayload } from '../../types'

type Props = {
  chat: Chat
  user: User
  onSend: (data: SendMessagePayload) => void
}

export function ChatMessageInput({ chat, user, onSend }: Props) {
  const inputRef = React.createRef<any>()

  const handleSendMessage = () => {
    const text = inputRef.current.value

    const member = chat.members.find(member => member.userId !== user.id)
    if (member && text) {
      onSend({
        chatId: chat._id,
        receiverId: member.userId,
        text
      })
    }
    inputRef.current.value = ''
  }

  const handlePressKey = (event: KeyboardEvent<Element>) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <Input
      referance={inputRef}
      className="input"
      placeholder="Type here..."
      multiline={false}
      rightButtons={<Button onClick={handleSendMessage}>Send</Button>}
      maxHeight={100}
      onKeyPress={handlePressKey}
    />
  )
}
