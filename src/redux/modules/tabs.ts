import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ActiveRoute } from '../types/routers'

const tabs = createSlice({
  name: 'tabs',
  initialState: {
    tabsCache: [] as ActiveRoute[],
  },
  reducers: {
    addTabs: (state, action: PayloadAction<ActiveRoute>) => {
      !state.tabsCache.some(({ path }) => path === action.payload.path) &&
        state.tabsCache.push(action.payload)
    },
    closeTabs: (state, action: PayloadAction<ActiveRoute>) => {
      const index = state.tabsCache.findIndex(({ path }) => path === action.payload.path)
      /** 默认0为主页 */
      index > 0 && state.tabsCache.splice(index, 1)
    },
  },
})

export default tabs
