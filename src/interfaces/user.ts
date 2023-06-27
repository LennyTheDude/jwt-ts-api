import { Request } from 'express';

export interface IUserInfo {
    email: string;
    id: string;
    isActivated: boolean;
}

export interface IUserRequest extends Request {
    user: IUserInfo;
}
