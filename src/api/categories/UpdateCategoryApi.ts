import {axiosInstance} from "../root";

export type UpdateCategory = {
  name: string
  slug: null | string
  description: null | string
  parentCategory: null | string
  active: null | boolean
  icon: null | string
}

export const updateCategoryApi = async (uuid: string, params: UpdateCategory): Promise<any> => {
  const response = await axiosInstance.put(`/categories/${uuid}`, params)
  return response.data
}