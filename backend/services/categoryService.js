const Category = require("../models/Category");
const { testFor } = require("../utils/validation");
 
async function getAllCategories() {
    const categories = await Category.find({}).lean() ;
    return categories;
}

async function createCategory(value) {
    testFor(!value, 'Category value must be provided.')
    testFor(value.length < 3 || value.length > 30, 'Category value length must be between 3 and 30 symbols')

    const post = await Category.create({
        value: value
    });
    
    return post;
}


module.exports = {
    getAllCategories,
    createCategory
};