const { getAllCategories, createCategory } = require('../services/categoryService');
const { requireAuthentication, requireAdminPrivileges } = require('../utils/middleware');

const categoriesController = require('express').Router();

categoriesController.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();
        
        res.json(categories); 
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
});

categoriesController.post('/create', requireAuthentication(), requireAdminPrivileges(), async (req, res) => {
    try {
        const { value } = req.body;
        const categories = await createCategory(value);
        
        res.json(categories); 
    } catch (error) {
        // TODO: add back util for error handling to all catches eventually
        res.status(400).json({ error: error.message })
    }
});


module.exports = categoriesController;
