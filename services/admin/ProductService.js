const categoryModel = require("../../model/CategoryModel");

class ProductService {
    constructor() { }

    async updateProductStatus(req) {
        console.log('updateProductStatus', req.body);
        const productId = req.body.proId;
        const status = req.body.status;
        console.log("productId", productId);
        console.log("status", status);
        await categoryModel.updateProductStatus(status, productId);
        return true;
    }

    async productPage(req) {
        let product = [];
        product = await categoryModel.getAllProduct();
        return product;
    }
}

module.exports = new ProductService();