const CategoryModel = require('../../model/CategoryModel');
const categoryService = require('../../services/admin/CategoryService');
const AdminValidation = require('../../validation/AdminValidation');


class CategoryController {
    constructor() { }

    async getCategoryPage(req, res) {
        try {
            let pagedata = {
                title: 'category page',
                pageName: 'category'
            }
            const categories = await categoryService.getCategoryPage(req);
            console.log("categories", categories);
            pagedata.categories = categories;
            res.render('admin/template', pagedata);
        } catch (error) {
            console.log("error ::: getcategorypage", error);
        }
    }
    async createNewCategory(req, res) {
        try {
            let validate = await AdminValidation.createNewCategoryValidation(req);
            if (validate && validate.status && validate.status == "Error") {
                req.session.status = "Error";
                req.session.message = validate.message;
                res.redirect('/admin/category');
                return false;
            }
            await categoryService.createNewCategory(req);
            res.redirect('/admin/category');
        } catch (error) {
            console.log("Error :: createNewCategory", error);
        }
    }

    async getSingleCategory(req, res) {
        try {
            let category = await categoryService.getSingleCategory(req);
            res.json(category);
        } catch (error) {
            console.log("Error :: getSingleCategory", error);
        }
    }

    async deleteCategory(req, res) {
        try {
            let deleteCat = await categoryService.deleteCategory(req);
            res.redirect('/admin/category');
        } catch (error) {
            console.log("Error :: deleteCategory", error);
        }
    }

    async updateCategory(req, res) {
        try {
            let updateCat = await categoryService.updateCategory(req.body);
            console.log('updateCat', updateCat);
            res.redirect('/admin/category');
        } catch (error) {
            console.log("Error :: updateCategory", error);
        }
    }
}


module.exports = new CategoryController();