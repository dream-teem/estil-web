import { config } from '@/config'
import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '..'
import {
  ConfirmVerificationRequest,
  ConfirmVerificationResponse,
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  RegisterResponse,
  SendVerificationRequest,
  SendVerificationResponse
} from './types'

export const AUTH_API_REDUCER_KEY = 'authApi'

const authApi = createApi({
  reducerPath: AUTH_API_REDUCER_KEY,
  baseQuery,
  endpoints: builder => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: credentials => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: credentials => ({
        url: 'auth/register',
        method: 'POST',
        body: credentials
      })
    }),
    checkUsername: builder.query<null, string>({
      query: username => ({
        url: `auth/check-username/${username}`,
        method: 'GET'
      })
    }),
    logout: builder.mutation<null, null>({
      query: () => ({
        url: 'auth/logout',
        method: 'GET'
      })
    }),
    sendVerification: builder.mutation<
      SendVerificationResponse,
      SendVerificationRequest
    >({
      query: data => ({
        url: `auth/send-verification`,
        method: 'post',
        body: data
      })
    }),
    confirmVerification: builder.mutation<
      ConfirmVerificationResponse,
      ConfirmVerificationRequest
    >({
      query: data => ({
        url: `${config.api.sms.baseUrl}confirm`,
        method: 'post',
        body: data
      })
    })
  })
})

export default authApi
