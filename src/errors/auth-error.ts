export default class AuthError extends Error {
    status;
    errors;

    constructor(status: any, message: any, errors?: any) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AuthError(401, 'Unauthorized user');
    }

    static BadRequest(message: any, errors = []) {
        return new AuthError(400, message, errors);
    }
}
