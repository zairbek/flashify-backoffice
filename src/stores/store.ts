import {configureStore} from '@reduxjs/toolkit'
import styleReducer from './styleSlice'
import mainReducer from './mainSlice'
import authDataStore from "./auth/AuthDataStore";
import userStore from "./user/UserStore";
import {useDispatch} from "react-redux";
import {createWrapper} from "next-redux-wrapper";
import categoryStore from "./category/CategoryStore";
import iconStore from "./icon/IconStore";


export function makeStore() {
  return configureStore({
    reducer: {
      style: styleReducer,
      main: mainReducer,
      auth: authDataStore,
      user: userStore,
      category: categoryStore,
      icon: iconStore,
    },
    devTools: process.env.NODE_ENV === 'development',
  })
}

export const store = makeStore()

export type RootStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useStoreDispatch = () => useDispatch<typeof store.dispatch>()
export const wrapper = createWrapper<RootStore>(makeStore, {
  // debug: process.env.NODE_ENV === 'development'
});
