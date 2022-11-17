const { login } = require('../../services/auth/authService');

const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.json([{
        username: 'someusername',
        hashedpass: 'somepass',
    }]);
});

authController.get('/login', async (req, res) => {
    try {
        // const { username, password } = req.body;
        const token = await login('someUsername', 'pass')
        
        res.json({token}); 
    } catch (error) {
        res.status(404).json({ error: error.message })
    }
});

module.exports = authController;