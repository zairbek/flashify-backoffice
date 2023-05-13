import {axiosInstance} from "../root";

export type CreateCategory = {
  name: string
  slug: null | string
  description: null | string
  parentCategory: null | string
  active: null | boolean
  icon: null | string
}

export const createCategoryApi = async (params: CreateCategory): Promise<any> => {
  const response = await axiosInstance.post('/categories', params)
  return response.data
}