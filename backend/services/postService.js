const User = require("../models/auth/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const { testFor } = require("../utils/validation");



async function getAllPosts(search, order, categoryId) {
    let filter = {};
    // filtering
    if(typeof search === 'string'  && search !== undefined && search !== '') {
        const regex = new RegExp(search.toLowerCase(), 'i');
        filter =  {...filter, $or: [{ title: regex }, { preview: regex }, { content: regex}] }
    }

    if (typeof categoryId === 'string'  && categoryId !== undefined && categoryId !== '') {
        const curCategory = await Category.findById(categoryId);
        if (curCategory) {
            filter = {...filter, category: curCategory }
        }
    }

    //sort
    if (!(typeof order === 'string' && order !== undefined && (order === 'asc' || order === 'desc'))) {
        order = 'asc';
    }
    const posts = await Post.find(filter).sort({ createdOn: order }).populate('category').lean();

    return posts;
}

async function getPostById(id, curUserId) {
    const post = await Post.findById(id).populate('category');
    testFor(!post, 'Post doesn\'t exist');
    let hasLiked = false;
    if (curUserId) {
        const user = await User.findById(curUserId);
        testFor(!user, 'User does not exist!');
        
        hasLiked = post.userLikes.includes(user._id);
    }
    
    return {
        _id: post._id,
        title: post.title,
        preview: post.preview,
        category: post.category,
        content: post.content,
        createdOn: post.createdOn,
        ownerName: post.ownerName,
        likes: post.likes,
        hasLiked
    };
}

async function getRecentPosts(take) {
    if(!take || typeof take !== 'number') {
        take = 10;
    }
    const posts = await Post.find({})
        .populate('category')
        .limit(take)
        .sort({ createdOn: 'desc' })
        .lean();

    return posts;
}

async function getPopularPosts(take) {
    if(!take || typeof take !== 'number') {
        take = 10;
    }

    const posts = await Post.find({})
        .populate('category')
        .sort({ likes: 'desc'})
        .limit(take)
        .lean();
    
    return posts;
}

async function getUserPosts(userId) {
    const user = await User.findById(userId);
    testFor(!user, "User does not exist.");
    
    const posts = await Post.find({ ownerId: { $eq: user._id }})
        .populate('category');
    
    return posts;
}

async function createPost(title, preview, content, categoryId, userId) {
    testFor(title.length < 5 && title.length > 30, 'Title is not the correct length!');
    testFor(content.length < 10, 'Content is not the correct length!');
    testFor(preview.length > 30, 'Preview is not the correct length!');

    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    testFor(user.isBanned, 'Banned users cannot create posts!')

    const category = await Category.findById(categoryId);
    testFor(!category, 'Category does not exist!');

    const post = await Post.create({
                title,
                preview,
                content,
                category,
                ownerId: userId,
                ownerName: user.username
            });

    return post.id;
}

async function updatePost(postId ,title, preview, content, categoryId, userId) {
    testFor(title.length < 5 && title.length > 30, 'Title is not the correct length!');
    testFor(content.length < 10, 'Content is not the correct length!');
    testFor(preview.length > 30, 'Preview is not the correct length!');
    
    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    testFor(user.isBanned, 'Banned users cannot edit their posts!')
    
    const category = await Category.findById(categoryId);
    testFor(!category, 'Category does not exist!');
    const newPostProps = {
        title,
        preview,
        content,
        category,
    };
    
    const post = await Post.findByIdAndUpdate({ _id: postId}, newPostProps);

    return postId;
}

async function likePost(postId, userId) {
    const post = await Post.findById(postId);
    testFor(!post, 'Post does not exist...');

    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    testFor(user.isBanned, 'Banned users cannot like posts!')
    testFor(post.userLikes.includes(user._id), 'User has already liked the post!')

    post.userLikes.push(user);
    post.likes++;
    post.save();
}

async function unLikePost(postId, userId) {
    const post = await Post.findById(postId);
    testFor(!post, 'Post does not exist...');

    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    testFor(user.isBanned, 'Banned users cannot like posts!')

    testFor(!post.userLikes.includes(user._id), 'User has not even liked the post!')

    const userLikesWithoutCurrentUser = post.userLikes.filter(u => u.toString() !== user._id.toString());

    post.userLikes = userLikesWithoutCurrentUser;
    post.likes--;
    post.save();
}

async function deletePost(postId, userId) {
    const post = await Post.findById(postId);
    testFor(!post, 'Post does not exist...');

    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    testFor(user.isBanned, 'Banned users cannot delete their posts!')

    await post.delete();
}

async function isPostOwner(postId, userId) {
    const post = await Post.findById(postId);
    testFor(!post, 'Post does not exist...');

    const user = await User.findById(userId);
    //TODO: add decorator so this can be repeated less
    testFor(!user, 'User does not exist!');

    return post.ownerId.toString() == userId;
}

module.exports = {
    getAllPosts,
    getPostById,
    getRecentPosts,
    getPopularPosts,
    getUserPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unLikePost,
    isPostOwner,
};