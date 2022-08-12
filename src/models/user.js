'use strict';
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database');

module.exports = () => {
    class User extends Model {
        static associate(models) { }
    }

    User.init(
        {
            email: {
                type: DataTypes.STRING,
                allowNull: false
            },
            password: {
                field: 'password_hash',
                type: DataTypes.STRING,
                allowNull: false
            },
            firstName: {
                field: 'first_name',
                type: DataTypes.STRING,
                allowNull: true
            },
            lastName: {
                field: 'last_name',
                type: DataTypes.STRING,
                allowNull: true
            },
            role: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'user',
            timestamps: false
        }
    );

    return User;
};