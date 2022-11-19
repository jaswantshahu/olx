const CategoryModel = require('../../model/CategoryModel');
const productService = require('../../services/admin/ProductService');
const AdminValidation = require('../../validation/AdminValidation');
const productModel = require('../../model/ProductModel');

class ProductController {
    constructor() { }

    async updateProductStatus(req, res) {
        try {
            await productService.updateProductStatus(req);
            res.redirect('/admin/category');
        } catch (error) {
            console.log("Error :: updateCategory", error);
        }
    }

    async productPage(req, res) {
        try {
            let pagedata = {
                title: 'My Products',
                pageName: 'user'
            }
            const products = await productService.productPage(req);
            console.log("product", products);
            pagedata.product = products;
            res.render('admin/template', pagedata);
        } catch (error) {
            console.log("error ::: userPage", error);
        }
    }

    async myPurchasedProduct(req, res) {
        try {
            let pagedata = {
                title: 'My order',
                pageName: 'my-orders',
                isUserLoggedIn: false,
                userdata: [],
            }
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                pagedata.userdata = user;
                pagedata.isUserLoggedIn = true;
                const products = await productModel.myPurchasedProduct(user.id);
                console.log("product", products);
                pagedata.product = products;
            }
            res.render('user/template', pagedata);
        } catch (error) {
            console.log("error ::: userPage", error);
        }
    }
}

module.exports = new ProductController();