import { createSlice, PayloadAction, SliceCaseReducers } from '@reduxjs/toolkit'
import { ActiveRoute } from '../types/routers'

const tabs = createSlice({
  name: 'tabs',
  initialState: {
    tabsCache: [] as ActiveRoute[],
  },
  reducers: {
    addTabs: (state, action: PayloadAction<ActiveRoute>) => {
      state.tabsCache.push(action.payload)
    },
    dropTabs: (state, action: PayloadAction<ActiveRoute>) => {},
  },
})

export default tabs
