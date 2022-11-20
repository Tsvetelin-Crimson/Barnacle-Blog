const { Schema, model, Types: { ObjectId } } = require('mongoose');

const categorySchema = new Schema({
    value: { type: String, required: true},
    creatorId: { type: ObjectId, ref: 'User', required: true },
    createdOn: { type: Date, default: new Date() ,required: true },

});

const Category = model('Category', categorySchema);

module.exports = Category;
