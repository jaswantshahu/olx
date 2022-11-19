const express = require("express");
const app = express();
const userController = require("../controller/UserController");
const productController = require("../controller/admin/ProductController");


app.get("/", userController.Homepage);

app.get("/register", userController.registerPage);

app.get("/login", userController.loginPage);

app.post('/register', userController.insertUser);

app.post('/authentication', userController.authentication);

app.get('/product', userController.productPage);

app.get('/logout', userController.logout);

app.post('/create-product', userController.insertProduct);

app.get('/my-products', userController.getMyProducts);

app.get('/buy-now', userController.buyNow);

app.post('/create-order', userController.placeOrder);

app.get('/selled-products', userController.selledProductsPage);

app.get('/orders', productController.myPurchasedProduct);


module.exports = app;