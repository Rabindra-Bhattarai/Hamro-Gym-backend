// routes/scheduledClasses.js
const express = require('express');
const router = express.Router();
const scheduledClassesController = require('../controllers/ScheduledClassesController');
const { verifyToken } = require('../middleware/authMiddleware');

router.post('/join', verifyToken, scheduledClassesController.joinClass); // Join a class
router.get('/joined', verifyToken, scheduledClassesController.getJoinedClasses); // Get joined classes

module.exports = router;