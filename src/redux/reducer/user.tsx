import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { userRouter } from '@src/api/types/user'
import { getRouter } from '@src/api/user'
import { DiyRouteObject } from '@src/types/user'

export const fetchRouter = createAsyncThunk('users/fetchRouter', async () => {
  const response = await getRouter()
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
