import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalPayload, ModalState } from './types'

const initialState: ModalState = {
  modal: null
}

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    showModal: (state, action: PayloadAction<ModalPayload>) => {
      state.modal = action.payload
    },
    closeModal: state => {
      state.modal = null
    }
  }
})

export const { showModal, closeModal } = modalSlice.actions

export const modalReducer = modalSlice.reducer
