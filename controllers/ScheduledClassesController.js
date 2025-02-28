// controllers/scheduledClassesController.js
const db = require('../models');

exports.joinClass = async (req, res) => {
    const { classId } = req.body; // Get class ID from request body
    const memberId = req.user.id; // Get member ID from JWT

    try {
        const gymClass = await db.Class.findByPk(classId);
        if (!gymClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        if (gymClass.currentCapacity >= gymClass.maxCapacity) {
            return res.status(400).json({ message: 'Class is full' });
        }

        // Update the class capacity
        gymClass.currentCapacity += 1;
        await gymClass.save();

        // Create a new entry in the ScheduledClasses table
        await db.ScheduledClasses.create({
            memberId: memberId,
            classId: classId,
        });

        res.json({ message: 'Joined class successfully', gymClass });
    } catch (error) {
        console.error('Error joining class:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getJoinedClasses = async (req, res) => {
    const memberId = req.user.id; // Get member ID from JWT
    try {
        const joinedClasses = await db.ScheduledClasses.findAll({
            where: { memberId: memberId },
            include: [{
                model: db.Class, // Assuming you have a Class model
                required: true,
            }],
        });
        res.json(joinedClasses);
    } catch (error) {
        console.error('Error fetching joined classes:', error);
        res.status(500).json({ error: error.message });
    }
};