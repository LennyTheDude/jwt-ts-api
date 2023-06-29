export default class AuthError extends Error {
    status;
    errors;

    constructor(status: number, message: string | undefined, errors?: unknown) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static UnauthorizedError() {
        return new AuthError(401, 'Unauthorized user');
    }

    static BadRequest(message: string, errors?: unknown) {
        return new AuthError(400, message, errors);
    }
}
