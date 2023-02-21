import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const injection = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    testInjection: 'init injection',
  },
  reducers: {
    incremented: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1
    },
    decremented: (state) => {
      state.value -= 1
    },
    setIntialState: (state, pay: PayloadAction<{ newInjection: string }>) => {
      console.log('重新设置了注入')
      state.testInjection = pay.payload.newInjection
    },
  },
})

export default injection
