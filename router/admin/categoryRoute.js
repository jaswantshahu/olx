const express = require('express');
const categoryController = require('../../controller/admin/CategoryController');
const app = express();

app.get('/', categoryController.getCategoryPage);



app.post('/', categoryController.createNewCategory);

app.get('/single', categoryController.getSingleCategory);

app.get('/delete-category', categoryController.deleteCategory);

app.post('/update-category', categoryController.updateCategory);

module.exports = app;