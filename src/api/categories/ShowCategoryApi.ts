import {axiosInstance} from "../root";

export type ShowCategory = {
  uuid: string
  name: string
  slug: string
  description?: null | string
  icon?: null | string
  isActive:  boolean
}

export const showCategoryApi = async (uuid: string): Promise<ShowCategory> => {
  const response = await axiosInstance.get(`/categories/${uuid}`)
  return response.data
}