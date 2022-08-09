const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const constant = require("../utils/constants");

const getPagination = (page, size) => {
    const limit = size ? +size : constant.pagination.SIZE_DEFAULT;
    const offset = page ? page * limit : 0;

    return { limit, offset };
};

const getPagingData = (data, page, size, limit) => {
    const { count: totalElements, rows: content } = data;
    const pageSize = size ? +size : 0;
    const pageNumber = page ? +page : 0;
    const totalPages = Math.ceil(totalElements / limit);
    const numberOfElements = content ? content.length : 0;

    return { totalPages, totalElements, numberOfElements, pageSize, pageNumber, content };
};

exports.login = async (req, res, next) => {
    const user = await User.findOne({ where: { email: req.body.email } });
    if (user) {
        const password_valid = await bcrypt.compare(req.body.password, user.password_hash);
        if (password_valid) {
            token = jwt.sign(
                {},
                process.env.SECRET_KEY,
                { expiresIn: '24h', subject: user.email }
            );
            res.status(200).send(token);
        } else {
            res.status(400).send(constant.message.USERNAME_OR_PASSWORD_INCORRECT);
        }
    } else {
        res.status(400).send(constant.message.USERNAME_OR_PASSWORD_INCORRECT);
    }
};

exports.getAll = (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    User.findAndCountAll({
        where: {
            role: constant.ROLE_USER
        },
        limit,
        offset
    }).then(data => {
        const response = getPagingData(data, page, size, limit);
        res.send(response);
    }).catch(err => {
        res.status(500).send(err);
    });
}

exports.get = (req, res, next) => {
    res.json('Get user ' + req.params.id);
}