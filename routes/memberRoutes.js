const express = require('express');
const {
    createMember,
    getMembers,
    deleteMember,
    updateMembershipStatus // Import the new function
} = require('../controllers/memberController');
const { verifyToken } = require('../middleware/authMiddleware');

const router = express.Router();

// Create a new member (staff only)
router.post('/', verifyToken, createMember);

// Get all members (staff only)
router.get('/', verifyToken, getMembers);

// Update membership status (staff only)
router.put('/:memberId/status', verifyToken, updateMembershipStatus); // New route for updating status

// Delete a member (staff only)
router.delete('/:memberId', verifyToken, deleteMember);

module.exports = router;