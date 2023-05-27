import {axiosInstance} from "../root";

export type UpdateIcon = {
  name: string
  file: null | string
}

export const updateIconApi = async (uuid: string, params: UpdateIcon): Promise<any> => {
  console.log(params)
  const response = await axiosInstance.post(`/digest/icons/${uuid}`, {
    _method: 'put',
    ...params
  }, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return response.data
}