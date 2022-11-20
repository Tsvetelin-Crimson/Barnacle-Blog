const { getAllPosts } = require('../services/postService');

const postsController = require('express').Router();

postsController.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        
        res.json(posts); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

module.exports = postsController;