import {axiosInstance} from "../root";
import {authorization} from "../../stores/auth/AuthDataStore";

export type ShowCategory = {
  uuid: string
  name: string
  slug: string
  description?: null | string
  icon?: null | string
  isActive:  boolean
}

export const showCategoryApi = async (uuid: string, token?: string = null): Promise<ShowCategory> => {
  const response = await axiosInstance.get(`/categories/${uuid}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return response.data
}