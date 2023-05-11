import {Token} from "./types";
import {axiosInstance} from "../root";

export const RefreshTokenApi = async (params: {refreshToken: string}): Promise<Token> => {
  const response = await axiosInstance.post('/auth/refresh-token', {refreshToken: params.refreshToken})
  return response.data
}