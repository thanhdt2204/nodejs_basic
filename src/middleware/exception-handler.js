const { BadRequestException } = require('../exception/errors');

const handleException = (err, req, res, next) => {
    if (err instanceof BadRequestException) {
        return res.status(400).send(err.message);
    }
    return res.status(500).send(err.message);
};

module.exports = handleException;