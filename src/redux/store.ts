import { configureStore } from '@reduxjs/toolkit'
import { user, communication } from './reducer'

export const store = configureStore({
  reducer: { user: user.reducer, communication: communication.reducer },
  // ,
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }),
})
