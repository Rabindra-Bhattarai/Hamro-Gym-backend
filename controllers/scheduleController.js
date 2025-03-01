// controllers/ScheduleController.js
const { db } = require('../models'); // Import the db object

// Add a new schedule
exports.addSchedule = async (req, res) => {
    const { classId, memberId } = req.body;

    try {
        // Create a new schedule
        const schedule = await db.Schedule.create({ classId, memberId });
        res.status(201).json(schedule);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a schedule
exports.deleteSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        // Delete the schedule by ID
        const deletedCount = await db.Schedule.destroy({ where: { id } });
        if (deletedCount) {
            res.status(204).send(); // No content to send back
        } else {
            res.status(404).json({ error: 'Schedule not found' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// View all schedules
exports.viewSchedules = async (req, res) => {
    try {
        // Fetch all schedules, including related Class and Member data
        const schedules = await db.Schedule.findAll(
            );
        res.status(200).json(schedules);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};