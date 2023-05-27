import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getIconApi, GetIconParams} from "../../api/icons/GetIconApi";

const InitialState = {
  current: null,
  data: [],
  meta: {
    limit: 0,
    offset: 0,
    total: 0,
    additional: {}
  }
}

export const getIconAction = createAsyncThunk(
  'getIconAction',
  async (param: GetIconParams) => {
    return await getIconApi(param);
  }
)

const IconStore = createSlice({
  name: 'icon',
  initialState: InitialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getIconAction.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.meta.limit = action.payload.meta.limit
      state.meta.offset = action.payload.meta.offset
      state.meta.total = action.payload.meta.total
      state.meta.additional = action.payload.meta.additional
    })
  }
})

export default IconStore.reducer