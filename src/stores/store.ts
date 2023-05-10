import { configureStore } from '@reduxjs/toolkit'
import styleReducer from './styleSlice'
import mainReducer from './mainSlice'
import authDataStore from "./auth/AuthDataStore";
import {useDispatch} from "react-redux";

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authDataStore
  },
  devTools: true,
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()