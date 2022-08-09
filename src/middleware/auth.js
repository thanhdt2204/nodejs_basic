const constant = require("../utils/constants");
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken && bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : null;

    if (!token) {
        console.log("Token null");
        return res.status(401).send(constant.message.UNAUTHORIZED);
    }
    try {
        jwt.verify(token, process.env.SECRET_KEY, { ignoreExpiration: false });
    } catch (err) {
        console.log(err);
        return res.status(401).send(constant.message.UNAUTHORIZED);
    }
    return next();
};

module.exports = verifyToken;