const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Class', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        time: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        maxCapacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        currentCapacity: {
            type: DataTypes.INTEGER,
            defaultValue: 0,
        },
        memberId: {  // Changed to a normal string
            type: DataTypes.STRING, // Change this to STRING
            allowNull: false, // You can set this to true or false based on your requirements
        },
    });
};