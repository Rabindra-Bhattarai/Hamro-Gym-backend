const express = require('express');
const {
    getAllUsers,
    deleteUserById,
    getUsersByRole,
    getUserByPhoneNumber
} = require('../controllers/userController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Get all users (admin only)
router.get('/', verifyToken, getAllUsers);

// Delete user by ID (admin only)
router.delete('/:id', verifyToken, deleteUserById);

// Get users by role (admin only)
router.get('/role/:role', verifyToken, getUsersByRole);

// Get user by phone number
router.get('/phone/:phoneNumber', verifyToken, getUserByPhoneNumber);

module.exports = router;