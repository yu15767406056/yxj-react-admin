import { configureStore } from '@reduxjs/toolkit'
import { routers } from './modules'

export const store = configureStore({
  reducer: { routers: routers.reducer },
  // ,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
})
