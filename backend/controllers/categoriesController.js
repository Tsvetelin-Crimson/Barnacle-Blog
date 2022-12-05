const { getAllCategories } = require('../services/categoryService');

const categoriesController = require('express').Router();

categoriesController.get('/', async (req, res) => {
    try {
        const categories = await getAllCategories();
        
        res.json(categories); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


module.exports = categoriesController;
