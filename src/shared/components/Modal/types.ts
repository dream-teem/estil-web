import React from 'react'

export type ModalPayload = {
  title?: string | null
  content: React.ReactNode
}

export type ModalState = {
  modal: ModalPayload | null
}
