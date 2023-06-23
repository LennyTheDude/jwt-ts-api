export interface IToken {
    userId: number;
    refreshToken: string;
}

export interface IUser {
    id: string;
    isActivated: boolean;
    email: string;
    password: string;
    activationLink: string;
}
