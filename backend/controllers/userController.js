const { getAllUsers } = require('../services/userService');
const { requireAuthentication, requireAdminPrivileges } = require('../utils/middleware');

const usersController = require('express').Router();

usersController.get('/', requireAuthentication(), requireAdminPrivileges(), async (req, res) => {
    try {
        const users = await getAllUsers();
        
        res.json(users); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


module.exports = usersController;
