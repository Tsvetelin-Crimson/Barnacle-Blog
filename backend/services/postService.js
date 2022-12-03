const User = require("../models/auth/User");
const Category = require("../models/Category");
const Post = require("../models/Post");
const { testFor } = require("../utils/validation");



async function getAllPosts() {
    let posts = await Post.find({}).populate('category');
     
    //TODO: remove when i have posts
    if(posts.length == 0) {
        posts = [
            {
                title: 'Title',
                category: 'Category',
                preview: 'Some preview Content',
                likes: 1,
                ownerName: 'User Peter'
            },
            {
                title: 'Title1',
                category: 'Category1',
                preview: 'Some preview Content1',
                likes: 2,
                ownerName: 'User Peter1'
            },
            {
                title: 'Title2',
                category: 'Category2',
                preview: 'Some preview Content2',
                likes: 3,
                ownerName: 'User Peter2'
            },
            {
                title: 'Title4',
                category: 'Category4',
                preview: 'Some preview Content4',
                likes: 5,
                ownerName: 'User Peter4'
            },
        ];
    }
    console.log(posts);
    return posts;
}

async function getPostById(id) {
    return await Post.findById(id).populate('category');
}

async function getRecentPosts(take) {
    if(!take || typeof take !== 'number') {
        take = 10;
    }
    let posts = await Post.find({})
        .populate('category')
        .limit(take)
        .sort({ createdOn: 'desc' });

    return posts;
}

async function getPopularPosts(take) {
    if(!take || typeof take !== 'number') {
        take = 10;
    }

    let posts = await Post.find({})
        .populate('category')
        .limit(take)
        .sort({ createdOn: 'desc' });

    return posts;
}

async function createPost(title, preview, content, categoryId, userId) {
    testFor(title.length < 5 && title.length > 30, 'Title is not the correct length!');
    testFor(content.length < 10, 'Content is not the correct length!');
    testFor(preview.length > 30, 'Preview is not the correct length!');

    const user = await User.findById(userId);
    testFor(!user, 'User does not exist!');
    
    console.log(user);
    console.log(user.username);
    const category = await Category.findById(categoryId);
    testFor(!category, 'Category does not exist!');

    const post = await Post.create({
                title,
                preview,
                description: content,
                category,
                ownerId: userId,
                ownerName: user.username
            });

    return post.id;
}

module.exports = {
    getAllPosts,
    getPostByID: getPostById,
    createPost,
    getRecentPosts,
    getPopularPosts,

};