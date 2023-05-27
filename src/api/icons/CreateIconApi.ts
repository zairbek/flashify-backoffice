import {axiosInstance} from "../root";

export type CreateIcon = {
  name: string
  file: any
}

export const createIconApi = async (params: CreateIcon): Promise<any> => {
  const response = await axiosInstance.post('/digest/icons', params, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}