import axios, {AxiosError, AxiosResponse} from "axios";
import {StatusHTTP} from "./types";

export const instance = axios.create({
    baseURL: 'http://market.loc/api/backoffice/v1',
    headers: {
        'client-id': '99101220-b12a-41bc-8948-fbe3e6202e90',
        'client-secret': 'qRaB75DqzY35cjIMvWaokbog8IhfHaXI7nBeqXIF'
    }
})

instance.interceptors.response.use((response): AxiosResponse => {
    return response
}, (error: AxiosError) => {
    if (error.response.status === 404) throw new Error(`${StatusHTTP.NOT_FOUND}`);
    if (error.response.status === 403) throw new Error(`${StatusHTTP.FORBIDDEN}`);
    if (error.response.status === 422) {
        return {
            success: false,
            data: error.response.data,
            status: StatusHTTP.BAD_STATUS
        }
    }
});