// const homeController = require('../controllers/homeController');
const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/auth/authController');
const postsController = require('../controllers/postController');

const endpointBase = '/api';

module.exports = (app) => {
    // app.use('/', homeController);
    app.use(`${endpointBase}/auth`, authController)
    app.use(`${endpointBase}/posts`, postsController)

    app.all('*', defaultController); 
}