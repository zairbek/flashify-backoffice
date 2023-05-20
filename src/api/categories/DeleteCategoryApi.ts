import {axiosInstance} from "../root";
export const deleteCategoryApi = async (uuid: string): Promise<any> => {
  const response = await axiosInstance.delete(`/categories/${uuid}`)
  return response.data
}