const userModel = require('../model/UserModel');
const sha1 = require('sha1');
const CategoryModel = require('../model/CategoryModel');

class UserServices {
    constructor() { }
    async insertUser(req) {
        console.log('services ::');
        console.log('req.body', req.body);
        let password = req.body.password;
        let encryptPass = sha1(password);
        let userData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.emailId,
            contact: req.body.contact,
            address: req.body.address,
            password: encryptPass
        };
        await userModel.insertUser(userData);
        return true;
    }
    async getUserByEmail(email) {
        //console.log('email', email);
        let Email = email;
        let user = await userModel.getUserByEmail(Email);
        //console.log('user', user);
        return user;
    }

    async insertProduct(req, data) {
        let userData = {
            title: req.title,
            description: req.description,
            price: req.price,
            category: req.category,
        };
        await userModel.insertProduct(userData, data);
        return true;
    }

    async getMyProducts(userId) {
        let products = await CategoryModel.getProductByUserId(userId);
        return products;
    }

    async byProductId(req) {
        let productId = req.productId;
        //console.log("productId.......", productId);
        let result = await userModel.byProductId(productId);
        return result;
    }

    async placeOrder(data, userId) {
        let orderData = {
            fullName: data.fullName,
            email: data.email,
            contact: data.contact,
            shippingAddress: data.shippingAddress,
            shippingPincode: data.shippingPincode,
            billingAddress: data.billingAddress,
            billingPincode: data.billingPincode,
            productId: data.productId,
            totalAmount: data.totalAmount,
            paymentMethod: data.paymentMethod,
            userId: userId
        };
        await userModel.placeOrder(orderData);
        await userModel.updateProductSelledStatus(data.productId);
        return true;
    }

}

module.exports = new UserServices();