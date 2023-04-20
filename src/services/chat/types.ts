import { Chat } from '@/modules/chat/types'

export interface UserChat
  extends Pick<
    Chat,
    | '_id'
    | 'product'
    | 'members'
    | 'lastMessageTimestamp'
    | 'totalMessages'
    | 'lastMessageText'
  > {}

export interface CreateChatRequest {
  productId: number
  userId: number
}

export type CreateChatResponse = Chat
