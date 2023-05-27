import {axiosInstance} from "../root";
export const deleteIconApi = async (uuid: string): Promise<any> => {
  const response = await axiosInstance.delete(`/digest/icons/${uuid}`)
  return response.data
}