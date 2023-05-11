import {axiosInstance} from "../../root";
import {User} from "../types";

export const getMeApi = async (accessToken: string): Promise<User> => {
  axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  const response = await axiosInstance.get('/me')
  return response.data
}