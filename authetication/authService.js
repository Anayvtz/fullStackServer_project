const { verifyToken } = require("./verification/jwt");

const auth = (req, res, next) => {

    try {
        const tokenFromClient = req.header("x-auth-token");
        if (!tokenFromClient) {
            const error = new Error("Please Login");
            error.status = 401;
            return createError("auth middleware", "Authentication", error);
        }
        const userInfo = verifyToken(tokenFromClient);
        if (!userInfo) {
            const error = new Error("Unauthorize user");
            error.status = 401;
            return createError("auth middleware", "Authentication", error);
        }
        req.user = userInfo;
        return next();
    } catch (error) {
        return handleError(res, 401, "auth middleware", error.message);
    }

};

module.exports = auth;
