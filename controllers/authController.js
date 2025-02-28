const { db } = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
    const { fullname, phonenumber, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await db.User.create({ fullname, phonenumber, email, password: hashedPassword, role });
        res.status(201).json({ message: 'User  created', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await db.User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: 'User  not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Return user type and token
        res.json({ token, userType: user.role });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};