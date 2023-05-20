import {axiosInstance} from "../root";

export type ShowCategory = {
  uuid: string
  name: string
  slug: string
  description?: null | string
  icon?: null | string
  isActive:  boolean
  parentCategory:  null | ShowCategory
}

export const showCategoryApi = async (uuid: string, token?: string = null): Promise<ShowCategory> => {
  const response = await axiosInstance.get(`/categories/${uuid}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return response.data
}