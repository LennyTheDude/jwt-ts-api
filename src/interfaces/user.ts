import { Request } from 'express';

export interface IUserInfo {
    email: string;
    id: string;
    isActivated: boolean;
}

export type IUserRequest = Request & {
    user?: IUserInfo;
};
