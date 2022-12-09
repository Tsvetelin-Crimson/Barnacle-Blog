const { getAllUsers, banUser, unBanUser } = require('../services/userService');
const { requireAuthentication, requireAdminPrivileges } = require('../utils/middleware');

const usersController = require('express').Router();

usersController.get('/', requireAuthentication(), requireAdminPrivileges(), async (req, res) => {
    try {
        const users = await getAllUsers(req.user._id);
        
        res.json(users); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

usersController.post('/ban', requireAuthentication(), requireAdminPrivileges(), async (req, res) => {
    try {
        const { userId } = req.body;
        const banned = await banUser(userId, req.user._id);
        
        res.json(banned); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

usersController.post('/unban', requireAuthentication(), requireAdminPrivileges(), async (req, res) => {
    try {
        const { userId } = req.body;
        const unbanned = await unBanUser(userId, req.user._id);
        
        res.json(unbanned); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});




module.exports = usersController;
