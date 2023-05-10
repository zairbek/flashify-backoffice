export enum StatusHTTP {
    OK = 200,
    NOT_FOUND = 404,
    FORBIDDEN = 403,
    BAD_STATUS = 'BAD_STATUS',
}

export type ApiResponse<T> = {
    success: boolean;
    data: T;
    status: StatusHTTP
}

export type ValidationErrors<T> = {
    message: string;
    errors: T;
}
