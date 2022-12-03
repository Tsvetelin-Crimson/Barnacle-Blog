const defaultController = require('../controllers/defaultController');
const authController = require('../controllers/auth/authController');
const postsController = require('../controllers/postController');
const categoriesController = require('../controllers/categoriesController');

const endpointBase = '/api';

module.exports = (app) => {
    app.use(`${endpointBase}/auth`, authController)
    app.use(`${endpointBase}/posts`, postsController)
    app.use(`${endpointBase}/categories`, categoriesController)

    app.all('*', defaultController); 
}