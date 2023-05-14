import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCategoryApi, GetCategoryParams} from "../../api/categories/GetCategoryApi";

type CatalogType = {
  uuid: string
  name: string
  slug: string
  description: null | string
  parentCategory: null | string,
  isActive: boolean,
  icon: null | string
}

type InitialStateType = {
  data: [CatalogType?]
  meta: {
    total: number
    offset: number
    limit: number
    additional?: {
      parent?: null | string
      current?: null | string
    }
  }
}

const initialState: InitialStateType = {
  data: [],
  meta: {
    limit: 0,
    offset: 0,
    total: 0,
    additional: {
      parent: '',
      current: '',
    }
  }
}

export const getCategoryAction = createAsyncThunk(
  'getCategoryAction',
  async (params: GetCategoryParams) => {
    return await getCategoryApi(params)
  }
)

const CategoryStore = createSlice({
  name: 'category',
  initialState: initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(getCategoryAction.fulfilled, (state, action) => {
      state.data = action.payload.data
      state.meta.limit = action.payload.meta.limit
      state.meta.offset = action.payload.meta.offset
      state.meta.total = action.payload.meta.total
      state.meta.additional.parent = action.payload.meta.additional.parent
      state.meta.additional.current = action.payload.meta.additional.current
    })
  }
})

export default CategoryStore.reducer