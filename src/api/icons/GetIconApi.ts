import {axiosInstance} from "../root";

export type IconData = {
  data: [Icon]
  meta: {
    total: number
    offset: number
    limit: number
    additional?: object
  }
}

export type Icon = {
  uuid: string
  name: string
  file: string
}

export type GetIconParams = {
  search?: null | string
  limit?: null | number
  offset?: null | number
  sortField?: null | string
  sortDirection?: null | string
}

export const getIconApi = async (params: GetIconParams, token = null): Promise<IconData> => {
  let queryParams: string = new URLSearchParams(params).toString()
  queryParams = queryParams ? `?${queryParams}` : '';

  let configs = {}
  if (token) {
    configs = {headers: {authorization: `Bearer ${token}`}}
  }

  const response = await axiosInstance.get(`/digest/icons${queryParams}`, configs)
  return response.data
}