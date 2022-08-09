const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const message = require('../utils/constants');

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
            res.status(400).send(message.USERNAME_OR_PASSWORD_INCORRECT);
        }
    } else {
        res.status(400).send(message.USERNAME_OR_PASSWORD_INCORRECT);
    }
};

exports.getAll = (req, res) => {
    res.json('Gel all users');
}

exports.get = (req, res) => {
    res.json('Get user ' + req.params.id);
}