// models/scheduledClasses.js
module.exports = (sequelize, DataTypes) => {
    const ScheduledClasses = sequelize.define('ScheduledClasses', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        memberId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users', // Assuming you have a Users model
                key: 'id',
            },
        },
        classId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Classes', // Assuming you have a Classes model
                key: 'id',
            },
        },
    });
    return ScheduledClasses;
};