import {axiosInstance} from "../root";
import {Token} from "./types";

export const signInApi = async (params: {email: string; password: string}): Promise<Token> => {
    const response = await axiosInstance.post('/auth/sign-in', {email: params.email, password: params.password})
    return response.data;
}