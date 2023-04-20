import { modalReducer, modalSlice } from '@/components/Modal/modalSlice'
import { authReducer, authSlice } from '@/modules/auth/slice'
import { chatReducer, chatSlice } from '@/modules/chat/slice'
import {
  alertReducer,
  alertSlice
} from '@/modules/common/components/Alert/slice'
import authApi, { AUTH_API_REDUCER_KEY } from '@/services/auth/api'
import chatApi, { CHAT_API_REDUCER_KEY } from '@/services/chat/api'
import cityApi, { CITY_API_REDUCER_KEY } from '@/services/cities/api'
import productApi, { PRODUCT_API_REDUCER_KEY } from '@/services/products/api'
import usersApi, { USERS_API_REDUCER_KEY } from '@/services/users/api'
import {
  Action,
  combineReducers,
  configureStore,
  Reducer,
  ThunkAction
} from '@reduxjs/toolkit'
import { Context, createWrapper } from 'next-redux-wrapper'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  Persistor,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE
} from 'redux-persist'
import { GetDefaultMiddlewareOptions } from './types'

const reducers = {
  [authSlice.name]: authReducer,
  [modalSlice.name]: modalReducer,
  [alertSlice.name]: alertReducer,
  [chatSlice.name]: chatReducer,
  [CITY_API_REDUCER_KEY]: cityApi.reducer,
  [CHAT_API_REDUCER_KEY]: chatApi.reducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [USERS_API_REDUCER_KEY]: usersApi.reducer,
  [PRODUCT_API_REDUCER_KEY]: productApi.reducer
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<AppState> = (state, action) => {
  return combinedReducer(state, action)
}

export function makeConfiguredStore(ctx?: Context) {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware<GetDefaultMiddlewareOptions>({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        },
        thunk: {
          extraArgument: ctx
        }
      }).concat([
        productApi.middleware,
        usersApi.middleware,
        authApi.middleware,
        cityApi.middleware,
        chatApi.middleware
      ]) // Add custom middlewares from ./middleware
  })
}

export const makeStore = (ctx: Context) => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore(ctx)
  } else {
    const store: ReturnType<typeof makeConfiguredStore> & {
      __persistor?: Persistor
    } = makeConfiguredStore()

    store.__persistor = persistStore(store)
    return store
  }
}

export type AppStore = ReturnType<typeof makeStore>
export type AppState = ReturnType<typeof combinedReducer>
export type AppDispatch = any

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>

export const useTypedDispatch = () => useDispatch<AppDispatch>()
export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector

export const wrapper = createWrapper<AppStore>(makeStore)
