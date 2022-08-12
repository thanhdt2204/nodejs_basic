const constant = require("../utils/constants");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const verifyToken = (req, res, next) => {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken && bearerToken.startsWith("Bearer ") ? bearerToken.substring(7) : null;

    if (!token) {
        console.log("Token null");
        return res.status(401).send(constant.message.UNAUTHORIZED);
    }
    try {
        const secrectKey = crypto.createSecretKey(process.env.SECRET_KEY, 'base64');
        jwt.verify(
            token,
            secrectKey,
            {
                ignoreExpiration: false,
                algorithms: 'HS512'
            }
        );
    } catch (err) {
        console.log(err);
        return res.status(401).send(constant.message.UNAUTHORIZED);
    }
    return next();
};

module.exports = verifyToken;