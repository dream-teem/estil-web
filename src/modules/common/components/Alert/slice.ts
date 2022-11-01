import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Alert, AlertState } from './types'

const initialState: AlertState = {
  alerts: []
}

export const alertSlice = createSlice({
  name: 'alertSlice',
  initialState,
  reducers: {
    createAlert: (state, action: PayloadAction<Alert>) => {
      state.alerts.push({
        message: action.payload.message,
        type: action.payload.type
      })
    }
  }
})

export const { createAlert } = alertSlice.actions

export const alertReducer = alertSlice.reducer
