const Category = require("../models/Category");

async function seedCategories() {
    const curCategories = await Category.find({});
    if (curCategories.length > 0) {
        return;
    }

    const categories = [{
        value: 'Gaming',
    },
    {
        value: 'News',
    },
    {
        value: 'Politics',
    },
    ]
    Category.create(categories);
}

module.exports = {
    seedCategories
}