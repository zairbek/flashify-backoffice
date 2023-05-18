import nookies, {parseCookies} from 'nookies';
import {getMeAction, UserStateType} from "../stores/user/UserStore";
import {refreshToken as refreshTokenAction} from "../stores/auth/AuthDataStore";
import {AccessTokenNotFoundError} from "../exceptions/AccessTokenNotFoundError";
import {RefreshTokenInvalidError} from "../exceptions/RefreshTokenInvalidError";


export const useAuth = async (context, store): Promise<UserStateType> => {
  const cookies = parseCookies(context)

  if (! cookies.accessToken && ! cookies.refreshToken) {
    throw new AccessTokenNotFoundError()
  }

  let userData: UserStateType;

  await store.dispatch(getMeAction({accessToken: cookies.accessToken})).then(async res => {
    if (res.payload) {
      userData = res.payload
    } else {
      await store.dispatch(refreshTokenAction({refreshToken: cookies.refreshToken})).then(async res => {
        if (!res.payload) {
          throw new RefreshTokenInvalidError()
        } else {
          nookies.set(context, 'accessToken', res.payload.accessToken, {maxAge: res.payload.lifeTime, path: '/'})
          nookies.set(context, 'refreshToken', res.payload.refreshToken, {path: '/'})
          await store.dispatch(getMeAction({accessToken: res.payload.accessToken})).then(async res => {
            userData = res.payload
          })
        }
      })
    }
  })

  return userData;
}
