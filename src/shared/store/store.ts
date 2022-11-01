import { modalReducer, modalSlice } from '@/components/Modal/modalSlice'
import { authReducer, authSlice } from '@/modules/auth/slice'
import {
  alertReducer,
  alertSlice
} from '@/modules/common/components/Alert/slice'
import authApi, { AUTH_API_REDUCER_KEY } from '@/services/auth/api'
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
import { createWrapper } from 'next-redux-wrapper'
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

const reducers = {
  [authSlice.name]: authReducer,
  [modalSlice.name]: modalReducer,
  [alertSlice.name]: alertReducer,
  [CITY_API_REDUCER_KEY]: cityApi.reducer,
  [AUTH_API_REDUCER_KEY]: authApi.reducer,
  [USERS_API_REDUCER_KEY]: usersApi.reducer,
  [PRODUCT_API_REDUCER_KEY]: productApi.reducer
}

const combinedReducer = combineReducers<typeof reducers>(reducers)

export const rootReducer: Reducer<AppState> = (state, action) => {
  return combinedReducer(state, action)
}

export function makeConfiguredStore() {
  return configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
      }).concat([
        productApi.middleware,
        usersApi.middleware,
        authApi.middleware,
        cityApi.middleware
      ]) // Add custom middlewares from ./middleware
  })
}

export const makeStore = () => {
  const isServer = typeof window === 'undefined'
  if (isServer) {
    return makeConfiguredStore()
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
