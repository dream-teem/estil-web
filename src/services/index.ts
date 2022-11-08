import { config } from '@/config'
import { authSlice } from '@/modules/auth/slice'
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError
} from '@reduxjs/toolkit/query/react'
import { Mutex } from 'async-mutex'
import queryString from 'qs'
import { isRequestContext } from './utils'

export const baseQuery = fetchBaseQuery({
  baseUrl: config.api.main.baseUrl,
  credentials: 'include',
  paramsSerializer: params => queryString.stringify(params),
  prepareHeaders: (headers, { extra: ctx }) => {
    if (isRequestContext(ctx)) {
      Object.entries(ctx.req.headers).forEach(([k, v]) =>
        headers.set(k, <string>v)
      )
    }

    return headers
  }
})

// create a new mutex
const mutex = new Mutex()

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const ctx = api.extra
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock()
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire()
      try {
        const refreshResult = await baseQuery(
          { url: 'auth/jwt/refresh', method: 'POST' },
          api,
          extraOptions
        )
        if (refreshResult.meta && refreshResult.meta.response?.status !== 401) {
          result = await baseQuery(args, api, extraOptions)

          const resHeaders = refreshResult.meta?.response?.headers
          // if context has req and res and refresh token response has set-cookie
          if (isRequestContext(ctx) && resHeaders) {
            // set new auth cookie from refresh token request to browser response
            const setCookie = resHeaders.get('set-cookie')
            if (setCookie) {
              ctx.res.setHeader('set-cookie', setCookie)
            }
          }
        } else {
          api.dispatch(authSlice.actions.logoutUser())
        }
      } finally {
        // release must be called once the mutex should be released again.
        release()
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock()
      result = await baseQuery(args, api, extraOptions)
    }
  }
  return result
}
