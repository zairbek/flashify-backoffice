import {axiosInstance} from "../root";

export type CategoryData = {
  data: [Category]
  meta: {
    total: number
    offset: number
    limit: number
    additional?: {
      parent?: string | null
      current?: string | null
    }
  }
}

export type Category = {
  uuid: string
  name: string
  slug: string
  description: null | string
  parentCategory: null | string,
  isActive: boolean,
  icon?: {
    uuid: string
    name: string
    file: string
  }
}

export type GetCategoryParams = {
  search?: null | string
  limit?: null | number
  offset?: null | number
  sortField?: null | string
  sortDirection?: null | string
  parentUuid?: null | string
}

export const getCategoryApi = async (params: GetCategoryParams): Promise<CategoryData> => {
  let queryParams: string = new URLSearchParams(params).toString()
  queryParams = queryParams ? `?${queryParams}` : '';

  const response = await axiosInstance.get(`/categories${queryParams}`)
  return response.data
}