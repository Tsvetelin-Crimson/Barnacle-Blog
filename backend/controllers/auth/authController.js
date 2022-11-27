const { login, register, verifyToken } = require('../../services/auth/authService');

const authController = require('express').Router();

authController.post('/register', async (req, res) => {
    try {
        // console.log(req.body);
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
        // console.log(req.body);
        // console.log(req.headers);
        const { username, password } = req.body;

        const token = await login(username, password)
        
        res.json({token}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

authController.post('/validateToken', (req, res) => {
    try {
        const { token } = req.body;
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


module.exports = authController;