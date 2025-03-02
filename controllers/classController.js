const { db } = require('../models');

exports.createClass = async (req, res) => {
    const { name, date, time, duration, maxCapacity } = req.body;
    try {
        const gymClass = await db.Class.create({ 
            name, 
            date, 
            time, 
            duration, 
            maxCapacity, 
            currentCapacity: 0 // Initialize current capacity to 0
        });
        res.status(201).json({ message: 'Class created', gymClass });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getClasses = async (req, res) => {
    try {
        const classes = await db.Class.findAll();
        res.json(classes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.joinClass = async (req, res) => {
    const { classId, memberId } = req.params;

    try {
        const gymClass = await db.Class.findByPk(classId);
        if (!gymClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        if (gymClass.currentCapacity >= gymClass.maxCapacity) {
            return res.status(400).json({ message: 'Class is full' });
        }

        gymClass.currentCapacity += 1;
        await gymClass.save();

        res.json({ message: 'Joined class successfully', gymClass });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateClass = async (req, res) => {
    const { classId } = req.params;
    const { name, date, time, duration, maxCapacity } = req.body;

    try {
        const gymClass = await db.Class.findByPk(classId);
        if (!gymClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        // Update class details
        gymClass.name = name || gymClass.name;
        gymClass.date = date || gymClass.date;
        gymClass.time = time || gymClass.time;
        gymClass.duration = duration || gymClass.duration;
        gymClass.maxCapacity = maxCapacity || gymClass.maxCapacity;

        await gymClass.save();

        res.json({ message: 'Class updated successfully', gymClass });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteClass = async (req, res) => {
    const { classId } = req.params;
    try {
        const gymClass = await db.Class.findByPk(classId);
        if (!gymClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        await gymClass.destroy();
        res.json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// New function to fetch joined classes
exports.getJoinedClasses = async (req, res) => {
    const memberId = req.user.id;
    try {
        const joinedClasses = await db.Class.findAll({
            where: { memberId: memberId }
        });
        res.json(joinedClasses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// New function to fetch unjoined classes
exports.getUnjoinedClasses = async (req, res) => {
    const memberId = req.user.id;
    try {
        const allClasses = await db.Class.findAll();
        const joinedClasses = await db.Class.findAll({
            where: { memberId: memberId }
        });

        const joinedClassIds = joinedClasses.map(gymClass => gymClass.id);
        const unjoinedClasses = allClasses.filter(gymClass => !joinedClassIds.includes(gymClass.id));

        res.json(unjoinedClasses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};