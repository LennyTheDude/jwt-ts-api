import { IUserInfo } from "../interfaces/user";

export default class UserDto implements IUserInfo {
    email;
    id;
    isActivated;

    constructor(model: any) {
        this.email = model.email;
        this.id = model.id;
        this.isActivated = model.isActivated;
    }
}
