const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaswant0712@',
    database: 'olx'
});

connection.connect(function (error) {
    if (error) {
        console.log("unable to connect database", error);
    } else {
        console.log("database connected");
    }
});

class ProductModel {
    constructor() { }


    myPurchasedProduct(userId) {
        return new Promise(function (resolve, reject) {
            const product = `SELECT O.*, P.title AS product_title FROM orders AS O INNER JOIN products AS P ON O.product_id=P.id WHERE O.buyer_id='${userId}'`;
            connection.query(product, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getProductByUserId(userId) {
        return new Promise(function (resolve, reject) {
            const product = `SELECT * FROM products WHERE userId='${userId}'`;
            connection.query(product, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    getVerifiedProducts(userId) {
        return new Promise(function (resolve, reject) {
            const product = `SELECT * FROM products WHERE status='approved' AND is_selled='0' AND userId!='${userId}'`;
            connection.query(product, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
}

module.exports = new ProductModel();