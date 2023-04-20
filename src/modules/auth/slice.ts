import authApi from '@/services/auth/api'
import storage from '@/store/storage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import { AuthState } from './types'

const initialState: AuthState = {
  token: null
}

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    logoutUser(state) {
      state.isLoggedIn = false
      delete state.user
    },
    setToken(state, { payload: token }: PayloadAction<string>) {
      state.token = token
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
          state.token = payload.token
        }
      ),
      builder.addMatcher(
        authApi.endpoints.register.matchFulfilled,
        (state, { payload }) => {
          state.isLoggedIn = true
          state.user = payload
          state.token = payload.token
        }
      )
  }
})

export const authReducer = persistReducer(
  {
    key: 'auth',
    storage
  },
  authSlice.reducer
)

export const { logoutUser, setToken } = authSlice.actions
