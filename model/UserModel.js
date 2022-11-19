const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Jaswant0712@',
    database: 'olx'
});

connection.connect(function (error) {
    if (error) {
        console.log("unable to connect with database", error);
    } else {
        console.log('database connected');
    }
});

class UserModel {
    constructor() { }

    insertUser(user) {
        return new Promise(function (resolve, reject) {
            //console.log("user", user);
            const createUser = `INSERT INTO users (first_name, last_name, email, contact, address, password) VALUES('${user.firstName}', '${user.lastName}', '${user.email}', '${user.contact}', '${user.address}', '${user.password}')`;
            connection.query(createUser, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    getUserByEmail(email) {
        return new Promise(function (resolve, reject) {
            const getuser = `SELECT * FROM users WHERE email='${email}'`;
            connection.query(getuser, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                };
            })
        })
    }

    insertProduct(userData, data) {
        return new Promise(function (resolve, reject) {
            console.log("data", data);
            const createProd = `INSERT INTO products (title, description, price, category, userId) VALUES('${userData.title}', '${userData.description}', '${userData.price}', '${userData.category}', '${data}')`;
            connection.query(createProd, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    allCategories(user) {
        return new Promise(function (resolve, reject) {
            const categories = `SELECT * FROM category`;
            connection.query(categories, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }

    byProductId(productId) {
        return new Promise(function (resolve, reject) {
            const prodId = `SELECT * FROM products WHERE id ='${productId}'`;
            connection.query(prodId, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            });
        });
    }
    
    placeOrder(order) {
        return new Promise(function (resolve, reject) {
            const orderQry = `INSERT INTO orders(full_name, email, contact, shipping_address, shipping_pincode, billing_address, billing_pincode, payment_method, amount, product_id, buyer_id) VALUES('${order.fullName}', '${order.email}', '${order.contact}', '${order.shippingAddress}', '${order.shippingPincode}', '${order.billingAddress}', '${order.billingPincode}', '${order.paymentMethod}', '${order.totalAmount}', '${order.productId}', '${order.userId}')`;
            connection.query(orderQry, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
    
    updateProductSelledStatus(productId) {
        return new Promise(function (resolve, reject) {
            const orderQry = `UPDATE products SET is_selled='1' WHERE id='${productId}'`;
            connection.query(orderQry, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
}

module.exports = new UserModel();