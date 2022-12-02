const { verifyToken } = require('../services/auth/authService');
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

postsController.post('/create', async (req, res) => {
    try {
        const { title, preview, content, categoryId, jwtToken } = req.body;
        
        const decodedToken = verifyToken(jwtToken);
        // console.log(decodedToken);
        const { _id } = decodedToken;
        const postId = await createPost(title, preview, content, categoryId, _id);
        
        res.json(postId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


module.exports = postsController;