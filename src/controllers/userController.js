const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user')();
const constant = require("../utils/constants");
const { BadRequestException } = require('../exception/errors');

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
        const password_valid = await bcrypt.compare(req.body.password, user.password);
        if (password_valid) {
            const secrectKey = crypto.createSecretKey(process.env.SECRET_KEY, 'base64');
            token = jwt.sign(
                { role: user.role },
                secrectKey,
                {
                    expiresIn: '24h',
                    subject: user.email,
                    algorithm: 'HS512'
                }
            );
            res.status(200).send(token);
        } else {
            res.status(400).send(constant.message.USERNAME_OR_PASSWORD_INCORRECT);
        }
    } else {
        res.status(400).send(constant.message.USERNAME_OR_PASSWORD_INCORRECT);
    }
};

exports.getAll = async (req, res, next) => {
    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    const userPage = await User.findAndCountAll({
        where: {
            role: constant.ROLE_USER
        },
        limit,
        offset,
        attributes: ['id', 'email', 'firstName', 'lastName']
    });
    res.send(getPagingData(userPage, page, size, limit));
}

exports.get = async (req, res, next) => {
    const user = await User.findOne({
        where: {
            email: req.params.email
        },
        attributes: ['id', 'email', 'firstName', 'lastName']
    });
    if (user === null) {
        var err = new BadRequestException('User not found');
        next(err);
    } else {
        res.send(user);
    }
}

exports.create = async (req, res, next) => {
    const existUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (existUser !== null) {
        var err = new BadRequestException('Email exist');
        next(err);
    } else {
        try {
            const user = await User.create({
                email: req.body.email,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                role: constant.ROLE_USER,
                password: await bcrypt.hash(constant.DEFAULT_PASSWORD, 12)
            });
            const { id, email, firstName, lastName } = user.dataValues;
            res.send({ id, email, firstName, lastName });
        } catch (err) {
            next(err);
        }
    }
}

exports.update = async (req, res, next) => {
    var existUser = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (existUser === null) {
        var err = new BadRequestException('User not found');
        next(err);
    } else {
        existUser.firstName = req.body.firstName;
        existUser.lastName = req.body.lastName;
        existUser = await existUser.save();
        const { id, email, firstName, lastName } = existUser.dataValues;
        res.send({ id, email, firstName, lastName });
    }
}

exports.delete = async (req, res, next) => {
    await User.destroy({
        where: {
            email: req.params.email
        }
    });
    res.send();
}