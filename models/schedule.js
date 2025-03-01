// models/schedule.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('Schedule', {
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        
        },
        memberId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });
};