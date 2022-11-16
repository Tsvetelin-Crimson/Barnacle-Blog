// const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/auth/authController');


module.exports = (app) => {
    // app.use('/', homeController);
    app.use('/api/auth', authController)

    app.all('*', defaultController); 
}