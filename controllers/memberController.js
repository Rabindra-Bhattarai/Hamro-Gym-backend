const { db } = require('../models');

exports.createMember = async (req, res) => {
    const { fullname, phonenumber, email, membershipType, startDate, expiryDate } = req.body;
    try {
        const member = await db.User.create({
            fullname,
            phonenumber,
            email,
            password: 'defaultPassword', // You can change this to a more secure password handling
            role: 'member',
            membershipType,
            startDate,
            expiryDate,
            status: 'active' // Default status
        });
        res.status(201).json({ message: 'Member created', member });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getMembers = async (req, res) => {
    try {
        const members = await db.User.findAll({ where: { role: 'member' } });
        res.json(members);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// New function to update membership status
exports.updateMembershipStatus = async (req, res) => {
    const { memberId } = req.params;
    const { action } = req.body; // 'continue' or 'remove'
    try {
        const member = await db.User.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        if (action === 'continue') {
            member.status = 'active';
        } else if (action === 'remove') {
            member.status = 'inactive';
        }

        await member.save(); // Save the updated member
        res.json({ message: 'Membership status updated successfully', member });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// New function to delete a member
exports.deleteMember = async (req, res) => {
    const { memberId } = req.params; // Get member ID from URL parameters
    try {
        const member = await db.User.findByPk(memberId);
        if (!member) {
            return res.status(404).json({ message: 'Member not found' });
        }

        await member.destroy(); // Delete the member
        res.json({ message: 'Member deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};