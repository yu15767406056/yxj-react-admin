import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FeatchRouteConfig } from '@/api/types/user'
import { getRouter } from '@/api/user'

/** 动态请求路由 */
export const fetchRouter = createAsyncThunk('users/fetchRouter', async () => {
  const response = await getRouter()
  return [...response.data, { path: '*', id: '*', hidden: true }]
})

const routers = createSlice({
  name: 'routers',
  initialState: {
    router: [] as FeatchRouteConfig[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRouter.fulfilled, (state, action) => {
      state.router = action.payload
    })
  },
})
export default routers
