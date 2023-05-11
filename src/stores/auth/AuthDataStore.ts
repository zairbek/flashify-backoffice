import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {signInApi} from "../../api/auth/SignInApi";
import {RefreshTokenApi} from "../../api/auth/RefreshTokenApi";
// import axios from "axios";

type TokenStateType = {
  accessToken: string;
  lifeTime: number;
  type: string;
  refreshToken: string;
}

const initialState: TokenStateType = {
  accessToken: "",
  lifeTime: 0,
  refreshToken: "",
  type: ""
}

export const authorization = createAsyncThunk(
  'authorization',
  async (params: { email: string; password: string }) => {
    return await signInApi(params)
  }
)

export const refreshToken = createAsyncThunk(
  'refreshToken',
  async (params: { refreshToken }) => {
    return await RefreshTokenApi(params)
  }
)

const AuthDataStore = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorization.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.lifeTime = action.payload.lifeTime
      state.refreshToken = action.payload.refreshToken
      state.type = action.payload.type
    })
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.accessToken = action.payload.accessToken
      state.lifeTime = action.payload.lifeTime
      state.refreshToken = action.payload.refreshToken
      state.type = action.payload.type
    })
  }
})

export default AuthDataStore.reducer;