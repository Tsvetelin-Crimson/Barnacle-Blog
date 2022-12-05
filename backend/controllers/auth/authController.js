const { login, register, verifyToken, verifyAdmin } = require('../../services/auth/authService');
const { requireAuthentication, requireAdminPrivileges } = require('../../utils/middleware');

const authController = require('express').Router();

authController.post('/register', async (req, res) => {
    try {
        const { username, email, password, repass } = req.body;

        const token = await register(username, email, password, repass)
        
        res.json({token}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

authController.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await login(username, password)
        
        res.json({token}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

authController.get('/validateToken',  (req, res) => {
    try {
        const token = req.headers["bearer"];
        let isValid = false;
        if (!token) {
            res.json(isValid);
            return;
        }
        try {
            verifyToken(token);
            isValid = true;
            res.json(isValid); 
        } catch (error) {
            res.json(isValid);
        }
        
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

authController.get('/validateAdmin', requireAuthentication(), async(req, res) => {
    try {
        let isAdmin = false;
        try {
             isAdmin = await verifyAdmin(req.user._id);
             res.json(isAdmin);
        } catch (error) {
            res.json(isAdmin);
        }
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

module.exports = authController;