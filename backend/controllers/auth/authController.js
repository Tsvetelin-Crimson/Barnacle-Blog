const authController = require('express').Router();

authController.get('/register', (req, res) => {
    res.json([{
        username: 'someusername',
        hashedpass: 'somepass',
    }]);
})



module.exports = authController;