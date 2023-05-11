import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getMeApi} from "../../api/user/Me/GetMeApi";

type InitialStateType = {
    uuid: string;
    email: string;
    firstName?: string;
    lastName?: string;
    sex?: string;
    status: string;
}

const initialState: InitialStateType = {
    uuid: null,
    email: null,
    firstName: null,
    lastName: null,
    sex: null,
    status: null,
}

export const getMeAction = createAsyncThunk(
  'getMeAction',
  async (params: {accessToken: string}) => {
    return await getMeApi(params.accessToken)
  }
)

const UserStore = createSlice({
    name: 'user',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
      builder.addCase(getMeAction.fulfilled, (state, action) => {
        state.uuid = action.payload.uuid
        state.email = action.payload.email
        state.firstName = action.payload.name.firstName
        state.lastName = action.payload.name.lastName
        state.sex = action.payload.sex
        state.status = action.payload.status
      })
    }
})

export default UserStore.reducer