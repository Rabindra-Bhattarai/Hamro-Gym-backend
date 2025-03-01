const express = require('express');
const router = express.Router();
const scheduleController = require('../controllers/scheduleController');

// Add a new schedule
router.post('/', scheduleController.addSchedule);

// Delete a schedule
router.delete('/:id', scheduleController.deleteSchedule);

// View all schedules
router.get('/', scheduleController.viewSchedules);

module.exports = router;