import React from 'react';
import { useSelector } from 'react-redux';
import {useStoreDispatch} from "../stores/store";
import {getMeAction} from "../stores/user/UserStore";
import {Token} from "../api/auth/types";
import {refreshToken} from "../stores/auth/AuthDataStore";

export const useGetUserData = () => {
  const dispatch = useStoreDispatch()
	const tokenStore = useSelector((state: any) => state.auth.accessToken);

	React.useEffect(() => {
		const tokenString = localStorage.getItem('token');
    if (! tokenStore) {
      const token = JSON.parse(tokenString) as Token;
      if (token) {
        dispatch(getMeAction({accessToken: token.accessToken})).then((res) => {
          if (res.error) {
            dispatch(refreshToken({refreshToken: token.refreshToken})).then(res => {
              if (!res.error) {
                localStorage.setItem('token', JSON.stringify(res.payload))
                dispatch(getMeAction({accessToken: res.payload.accessToken}))
              } else {
                localStorage.removeItem('token')
              }
            })
          }
        })
      }
    }
	}, []);
};
