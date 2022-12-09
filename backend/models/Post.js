const { Schema, model, Types: { ObjectId } } = require('mongoose');

const postSchema = new Schema({
    title: { type: String, required: true},
    category: { type: ObjectId, ref: 'Category', required: true},
    content: { type: String },
    preview: { type: String, required: true },
    likes: { type: Number, default: 0 },
    userLikes: { type: [ObjectId], ref: 'User', default: []},
    createdOn: { type: Date, default: new Date() ,required: true },
    ownerName: { type: String, required: true },
    ownerId: { type: ObjectId, ref: 'User', required: true },
});

const Post = model('Post', postSchema);

module.exports = Post;
