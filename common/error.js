class AppError extends Error {
    constructor(code, message) {
        super(message);
        this.code = code;
        this.description = message;
    }
}

module.exports = AppError;