import authApi from '@/services/auth/api'
import storage from '@/store/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { AuthState } from './types'

const initialState: AuthState = {}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logoutUser(state) {
      state.isLoggedIn = false
      delete state.user
    },
    saveToken(state, { payload }: PayloadAction<string>) {
      state.accessToken = payload || null
    }
  },
  extraReducers: builder => {
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, state => {
      state.isLoggedIn = false
      delete state.user
    }),
      builder.addMatcher(
        authApi.endpoints.login.matchFulfilled,
        (state, { payload }) => {
          state.isLoggedIn = true
          state.user = payload
        }
      ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.isLoggedIn = true
          state.user = payload
        }
      )
  }
})

export const authReducer = persistReducer(
  {
    key: 'auth',
    storage,
    whitelist: ['user', 'isLoggedIn']
  },
  authSlice.reducer
)

export const { logoutUser, saveToken } = authSlice.actions
