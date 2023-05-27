import {axiosInstance} from "../root";

export type ShowIcon = {
  uuid: string
  name: string
  file: string
}

export const showIconApi = async (uuid: string, token: string): Promise<ShowIcon> => {
  const response = await axiosInstance.get(`/digest/icons/${uuid}`, {
    headers: {
      authorization: `Bearer ${token}`
    }
  })
  return response.data
}