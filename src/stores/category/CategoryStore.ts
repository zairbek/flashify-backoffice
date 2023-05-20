import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCategoryApi, GetCategoryParams} from "../../api/categories/GetCategoryApi";
import {showCategoryApi} from "../../api/categories/ShowCategoryApi";
import {stat} from "fs";

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
  current: null | object,

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
  current: null,
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

export const showCategoryAction = createAsyncThunk(
  'showCategoryAction',
  async (uuid: string, token?: string = null) => {
    return await showCategoryApi(uuid, token)
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
    builder.addCase(showCategoryAction.fulfilled, (state, action) => {
      state.current = action.payload
    })
  }
})

export default CategoryStore.reducer