import { UserPreview } from '@/modules/users/types'
import { createApi } from '@reduxjs/toolkit/query/react'
import { HYDRATE } from 'next-redux-wrapper'
import { baseQueryWithReauth } from '..'
import {
  GetUserProfileRequest,
  GetUserProfileResponse,
  GetUserResponse,
  GetUsersResponse,
  ToggleFollowRequest,
  ToggleFollowResponse,
  UpdateUserProfileRequest
} from './types'

export const USERS_API_REDUCER_KEY = 'usersApi'

const usersApi = createApi({
  reducerPath: USERS_API_REDUCER_KEY,
  baseQuery: baseQueryWithReauth,
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath]
    }
  },
  tagTypes: ['User', 'Users', 'Followers', 'Followings'],
  endpoints: builder => ({
    getUsers: builder.query<GetUsersResponse, null>({
      query: () => ({
        url: 'users',
        method: 'GET'
      })
      // providesTags: ['Users']
    }),
    getUser: builder.query<GetUserProfileResponse, GetUserProfileRequest>({
      query: ({ username }) => ({
        url: `users/${username}`,
        method: 'GET'
      })
    }),
    getProfile: builder.query<GetUserResponse, null>({
      query: () => ({
        url: `users/profile`,
        method: 'GET'
      }),
      providesTags: arg => (arg ? [{ type: 'User', id: arg?.id }] : [])
    }),
    getFollowers: builder.query<UserPreview[], string>({
      query: username => ({
        url: `users/${username}/followers`,
        method: 'GET'
      }),
      providesTags: () => [{ type: 'Followers', id: 'LIST' }]
    }),
    getFollowings: builder.query<UserPreview[], string>({
      query: username => ({
        url: `users/${username}/followings`,
        method: 'GET'
      }),
      providesTags: () => [{ type: 'Followings', id: 'LIST' }]
    }),
    updateProfile: builder.mutation<{}, UpdateUserProfileRequest>({
      query: data => ({
        url: `users/profile`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (res_, fetch_, args) => [{ type: 'Users', id: args.id }]
    }),

    toggleFollow: builder.mutation<ToggleFollowResponse, ToggleFollowRequest>({
      query: user => ({
        url: 'followings/toggle',
        method: 'POST',
        body: {
          userIds: [user.id]
        }
      }),
      invalidatesTags: () => [{ type: 'Followings', id: 'LIST' }],
      async onQueryStarted({ username }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          usersApi.util.updateQueryData('getUser', { username }, user => {
            if (user.isFollowed) {
              user.follorwers -= 1
            } else {
              user.follorwers += 1
            }
            user.isFollowed = !user.isFollowed
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()

          /**
           * Alternatively, on failure you can invalidate the corresponding cache tags
           * to trigger a re-fetch:
           * dispatch(api.util.invalidateTags(['Post']))
           */
        }
      }
    })
  })
})

export default usersApi
