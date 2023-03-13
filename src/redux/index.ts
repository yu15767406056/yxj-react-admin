import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { routers, tabs } from './modules'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 创建reducer(拆分reducer)
const rootReducer = combineReducers({ routers: routers.reducer, tabs: tabs.reducer })

//Redux持久化
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// 创建持久化store
export const persistor = persistStore(store)
