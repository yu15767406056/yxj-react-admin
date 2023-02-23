import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userRouter } from '@/api/types/user'
import { getRouter } from '@/api/user'
import { DiyRouteObject } from '@/types/user'

export const fetchRouter = createAsyncThunk('users/fetchRouter', async () => {
  const response = await getRouter()
  console.log('获取了', response)
  return response.data
})

const user = createSlice({
  name: 'user',
  initialState: {
    router: [] as userRouter[],
    featchRouterConfig: [] as DiyRouteObject[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRouter.fulfilled, (state, action) => {
      state.router = action.payload
      console.log('我看看', action.payload)
    })
  },
})
export default user
