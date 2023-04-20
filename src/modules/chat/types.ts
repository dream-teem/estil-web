import { UserChat } from '@/services/chat/types'

export interface ChatMember {
  userId: number
  username: string
  pictureUrl?: string
  lastReadTimestamp: string
  unreadCount: number
}

export interface ChatMessage {
  id: string
  userId: number
  text: string
  timestamp: string
}

export interface ChatProduct {
  productId: number
  userId: number
  pictureUrl: string
}

export interface Chat {
  _id: string
  members: ChatMember[]
  messages: ChatMessage[]
  product?: ChatProduct
  lastMessageTimestamp?: string
  lastMessageText?: string
  totalMessages: number
}

export interface ChatState {
  messages: {
    [key: string]: ChatMessage[]
  }
  chats: UserChat[]
  chatsMap: Record<string, Chat>
}

export enum ChatEvent {
  NEW_MESSAGE = 'new-message',
  MARK_READ = 'mark-read',
  EXCEPTION = 'exception',
  MESSAGE_SENT = 'message-sent'
}

export enum ChatEmitEvent {
  SEND_MESSAGE = 'send-message',
  MARK_READ = 'mark-read',
  TYPING_MESSAGE = 'typing-message'
}
export interface ChatExceptionPayload {
  status: 'error'
  message: String
}

export interface ChatNewMessagePayload {
  chatId: string
  message: ChatMessage
}

export interface ChatMarkedReadPayload {
  chatId: string
  userId: number
  lastReadTimestamp: string
}

export interface SendMessagePayload {
  receiverId: number
  chatId: string
  text: string
}

export interface TypingMessagePayload {
  receiverId: number
  chatId: string
}

export interface MarkChatReadPayload {
  senderId: number
  chatId: string
}
