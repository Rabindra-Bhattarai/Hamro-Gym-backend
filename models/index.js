// models/index.js
const sequelize = require('../config/config');
const User = require('./user.js');
const Class = require('./class.js');
const Schedule = require('./schedule.js');
const member = require('./member.js');

const db = {
    User: User(sequelize),
    Class: Class(sequelize),
    Schedule: Schedule(sequelize), // Ensure this is correctly spelled
    member: member(sequelize),
};

module.exports = { sequelize, db };