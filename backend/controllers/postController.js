const { getAllPosts, createPost } = require('../services/postService');

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

postsController.post('/', async (req, res) => {
    try {
        const { title, preview, content, categoryId, userId } = req.body

        const postId = await createPost(title, preview, content, categoryId, userId);
        
        res.json(postId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


module.exports = postsController;