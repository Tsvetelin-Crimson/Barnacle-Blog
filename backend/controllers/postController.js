const { verifyToken } = require('../services/auth/authService');
const { getAllPosts, createPost, getRecentPosts, getPopularPosts, getPostByID } = require('../services/postService');

const postsController = require('express').Router();
// TODO: add correct response status
postsController.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        
        res.json(posts); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});
postsController.get('/id', async (req, res) => {
    try {
        const { id } = req.query;
        const post = await getPostByID(id);
        
        res.json(post); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.get('/recent', async (req, res) => {
    try {
        const { take } = req.query;
        const posts = await getRecentPosts(take);
        
        res.json(posts); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.get('/popular', async (req, res) => {
    try {
        const { take } = req.query;
        const posts = await getPopularPosts(take);
        
        res.json(posts); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/create', async (req, res) => {
    try {
        const { title, preview, content, categoryId, jwtToken } = req.body;
        console.log(title, preview, content, categoryId, jwtToken);
        let _id = '';
        try {
            const decodedToken = verifyToken(jwtToken);
            _id = decodedToken._id; 
        } catch (error) {
            res.status(403).json({error: 'You must be loggied in!'});            
        }
        const postId = await createPost(title, preview, content, categoryId, _id);
        
        res.json(postId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


module.exports = postsController;