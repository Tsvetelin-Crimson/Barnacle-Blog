const Category = require("../models/Category");
 
async function getAllCategories() {
    const categories = await Category.find({}).lean() ;
    return categories;
}

module.exports = {
    getAllCategories
};