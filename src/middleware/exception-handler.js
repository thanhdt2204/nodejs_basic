const { BadRequestException } = require('../exception/errors');
const Sequelize = require("sequelize");

const handleException = (err, req, res, next) => {
    if (err instanceof BadRequestException) {
        return res.status(400).send(err.message);
    } else if (err instanceof Sequelize.ValidationError) {
        var message = '';
        err.errors.map(e => message = message + '[' + e.message + ']');
        return res.status(400).send(message);
    }
    return res.status(500).send(err.message);
};

module.exports = handleException;