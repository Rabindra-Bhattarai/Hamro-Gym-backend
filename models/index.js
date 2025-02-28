const sequelize = require('../config/config');
const User = require('./user.js');
const Class = require('./class.js');

const db = {
    User: User(sequelize),
    Class: Class(sequelize),
};

db.User.hasMany(db.Class, { foreignKey: 'staffId' });
db.Class.belongsTo(db.User, { foreignKey: 'staffId' });

module.exports = { sequelize, db };