const express = require('express');
const app = express();
const categoryRoute = require('./admin/categoryRoute');
const productRoute = require('./admin/productRoute');

app.get('/', function (req, res) {
    let pagedata = {
        title: 'home page',
        pageName: 'dashboard'
    }
    res.render('admin/template', pagedata);
});

app.use('/product', productRoute);

app.use('/category', categoryRoute);



/* app.get('/product', function (req, res) {
    let pagedata = {
        title: 'product page',
        pageName: 'product'
    }
    res.render('admin/template', pagedata);
}); */

app.get('/order', function (req, res) {
    let pagedata = {
        title: 'order page',
        pageName: 'order'
    }
    res.render('admin/template', pagedata);
});

module.exports = app;