const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('User ', {
        fullname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phonenumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.ENUM('admin', 'staff', 'member'),
            allowNull: false,
        },
    });
};