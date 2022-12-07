const { verifyToken } = require('../services/auth/authService');
const { getAllPosts, createPost, getRecentPosts, getPopularPosts, getPostById, isPostOwner, updatePost, deletePost, likePost } = require('../services/postService');
const { requireAuthentication } = require('../utils/middleware');

const postsController = require('express').Router();
// TODO: add correct response status
postsController.get('/', async (req, res) => {
    try {
        const posts = await getAllPosts();
        res.json(posts); 
    } catch (error) {
        // TODO: add back util for error handling
        console.log(error);
        res.status(400).json({ error: error.message })
    }
});

postsController.get('/id', async (req, res) => {
    try {
        const { id } = req.query;
        // this is really bad but w/e
        checkForAndAddUser(req);

        const post = await getPostById(id, req.user?._id);
        // console.log(post)
        res.json(post); 
    } catch (error) {
        // TODO: add back util for error handling
        console.log(error);
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

postsController.post('/create', requireAuthentication(), async (req, res) => {
    try {
        const { title, preview, content, categoryId } = req.body;

        const postId = await createPost(title, preview, content, categoryId, req.user._id);
        
        res.status(201).json(postId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/update', requireAuthentication(), async (req, res) => {
    try {
        const { postId, title, preview, content, categoryId } = req.body;

        const isOwner = await checkIsOwner(postId, req.user._id);

        if (!isOwner) {
            res.status(403).json({ error: 'You are not the owner.' })
            return;
        }
        const updatedPostId = await updatePost(postId ,title, preview, content, categoryId, req.user._id);
        
        res.json(updatedPostId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/delete', requireAuthentication(), async (req, res) => {
    try {
        const { postId } = req.body;

        const isOwner = await checkIsOwner(postId, req.user._id);
        if (!isOwner) {
            res.status(403).json({ error: 'You are not the owner.' })
            return;
        }

        await deletePost(postId , req.user._id);
        
        res.status(200).json({ message: `Successfully deleted post with id ${postId}`}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/like', requireAuthentication(), async (req, res) => {
    try {
        const { postId } = req.body;

        const isOwner = await checkIsOwner(postId, req.user._id);
        if (isOwner) {
            res.status(403).json({ error: 'You are the owner.' })
            return;
        }
        await likePost(postId , req.user._id);
        
        res.status(200).json({ message: `Successfully liked post with id ${postId}`}); 
    } catch (error) {
        // TODO: add back util for error handling
        console.log(error);
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/validateOwnership', requireAuthentication(), async (req, res) => {
    try {
        const { postId } = req.body;

        const isOwner = await isPostOwner(postId, req.user._id);
        
        res.json(isOwner); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

async function checkIsOwner(postId, userId) {
    try {
        const isOwner = await isPostOwner(postId, userId);
        return isOwner;
    } catch (error) {
        return false;
    }
}

function checkForAndAddUser(req) {
    const jwtToken = req.headers["bearer"]
    if (jwtToken) {
        try {
            const decodedToken = verifyToken(jwtToken);
            req.user = decodedToken;
        } catch (error) {
        }
    }
}

module.exports = postsController;