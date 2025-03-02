const express = require('express');
const {
    createClass,
    getClasses,
    joinClass,
    updateClass,
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

// Join a class (member only)
router.post('/join/:classId/:memberId', verifyToken, joinClass);

// Update a class (staff only)
router.put('/:classId', verifyToken, updateClass);

// Delete a class (staff only)
router.delete('/:classId', verifyToken, deleteClass);



module.exports = router;