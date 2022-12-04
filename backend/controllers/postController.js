const { verifyToken } = require('../services/auth/authService');
const { getAllPosts, createPost, getRecentPosts, getPopularPosts, getPostById, isPostOwner, updatePost, deletePost, likePost } = require('../services/postService');

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
        const post = await getPostById(id);
        
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
        let _id = '';
        try {
            const decodedToken = verifyToken(jwtToken);
            _id = decodedToken._id; 
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});   
            return;         
        }
        const postId = await createPost(title, preview, content, categoryId, _id);
        
        res.json(postId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/update', async (req, res) => {
    try {
        const { postId, title, preview, content, categoryId, jwtToken } = req.body;
        let userId = '';
        try {
            userId = getUserDecodedToken(jwtToken)._id;
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});
            return;   
        }

        try {
            const isOwner = await isPostOwner(postId, userId);

            if (!isOwner) {
                throw new Error('You are not the owner.');
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
            return
        }
        const updatedPostId = await updatePost(postId ,title, preview, content, categoryId, userId);
        
        res.json(updatedPostId); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/delete', async (req, res) => {
    try {
        const { postId, jwtToken } = req.body;
        let userId = '';
        try {
            userId = getUserDecodedToken(jwtToken)._id;
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});
            return;   
        }

        try {
            const isOwner = await isPostOwner(postId, userId);

            if (!isOwner) {
                throw new Error('You are not the owner.');
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
            return
        }
        await deletePost(postId , userId);
        
        res.status(200).json({ message: `Successfully deleted post with id ${postId}`}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/like', async (req, res) => {
    try {
        const { postId, jwtToken } = req.body;
        let userId = '';
        try {
            userId = getUserDecodedToken(jwtToken)._id; 
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});
            return;   
        }

        try {
            const isOwner = await isPostOwner(postId, userId);
            console.log(isOwner);
            if (isOwner) {
                throw new Error('You are the owner.');
            }
        } catch (error) {
            res.status(403).json({ error: error.message })
            return
        }
        await likePost(postId , userId);
        
        res.status(200).json({ message: `Successfully liked post with id ${postId}`}); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});

postsController.post('/validateOwnership', async (req, res) => {
    try {
        const { postId, jwtToken } = req.body;
        let userId = '';
        try {
            userId = getUserDecodedToken(jwtToken)._id;
        } catch (error) {
            res.status(401).json({error: 'You must be loggied in!'});
            return;   
        }

        const isOwner = await isPostOwner(postId, userId);
        
        res.json(isOwner); 
    } catch (error) {
        // TODO: add back util for error handling
        res.status(400).json({ error: error.message })
    }
});


function getUserDecodedToken(token) {
    const decodedToken = verifyToken(token);
    return decodedToken;
}


module.exports = postsController;