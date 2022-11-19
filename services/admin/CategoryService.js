const categoryModel = require("../../model/CategoryModel");

class CategoryService {
    constructor() { }

    async getCategoryPage(req) {
        let categories = [];
        categories = await categoryModel.getAllCategories();
        return categories;
    }

    

    async createNewCategory(req) {
        const title = req.body.title;
        const parentId = (req.body.parent) ? req.body.parent : 0;
        await categoryModel.createNewCategory(title, parentId);
        return true;
    }

    async getSingleCategory(req) {
        const categoryId = req.query.categoryId;
        const category = await categoryModel.getSingleCategory(categoryId);
        console.log("category", category);
        return category;
    }

    async deleteCategory(req) {
        const categoryId = req.query.categoryId;
        const category = await categoryModel.deleteCategory(categoryId);
        console.log("category", category);
        return category;
    }

    async updateCategory(req) {
        console.log('upadateCAtegory',req);
        const title = req.title;
        const parentId = req.parent;
        const categoryId = req.categoryId;
        console.log('categoryId', categoryId);
        const category = await categoryModel.updateCategory(title,parentId,categoryId);
        console.log("category", category);
        return category;
    }
}
module.exports = new CategoryService();