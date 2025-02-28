const express = require('express');
const {
    createClass,
    getClasses,
    joinClass,
    deleteClass,
    getJoinedClasses,
    getUnjoinedClasses
} = require('../controllers/classController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new class (staff only)
router.post('/', verifyToken, createClass);

// Get all classes (any user)
router.get('/', verifyToken, getClasses);

// Join a class (member only) - updated to include memberId in the route
router.post('/join/:classId/:memberId', verifyToken, joinClass);

// Delete a class (staff only)
router.delete('/:classId', verifyToken, deleteClass);

// Get joined classes (member only)
router.get('/joined', verifyToken, getJoinedClasses);

// Get unjoined classes (member only)
router.get('/unjoined', verifyToken, getUnjoinedClasses);

module.exports = router;