import Category from "../models/Category";

export async function seedCategories() {
    const curCategories = await Category.find({});
    if (curCategories.length > 0) {
        return;
    }

    const categories = [{
        value: 'Gaming',
        creatorId: 'default',
    },
    {
        value: 'News',
        creatorId: 'default',
    },
    {
        value: 'Politics',
        creatorId: 'default',
    },
    ]
    Category.create(categories);
}