const express = require('express');
const productController = require('../../controller/admin/ProductController');
const app = express();


app.put('/update_status', productController.updateProductStatus);

app.get('/', productController.productPage);


// app.get('/product', categoryController.userPage);

module.exports = app;