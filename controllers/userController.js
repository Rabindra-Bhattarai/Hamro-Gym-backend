const { db } = require('../models');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await db.User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        await user.destroy();
        res.json({ message: 'User  deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUsersByRole = async (req, res) => {
    const { role } = req.params;
    try {
        const users = await db.User.findAll({ where: { role } });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getUserByPhoneNumber = async (req, res) => {
    const { phoneNumber } = req.params;
    try {
        const user = await db.User.findOne({ where: { phonenumber: phoneNumber } });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};