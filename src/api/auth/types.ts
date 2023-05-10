export type Token = {
    accessToken: string;
    type: string;
    lifeTime: number;
    refreshToken: string;
}

export type SignInError = {
    email: string[]
    password: string[]
}
