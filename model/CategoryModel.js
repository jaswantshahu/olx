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

class CategoryModel {
    constructor() { }

    getAllCategories(user) {
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

    createNewCategory(title, parentId) {
        return new Promise(function (resolve, reject) {
            const categories = `INSERT INTO category(title, parent_id) VALUES('${title}', '${parentId}')`;
            connection.query(categories, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    getSingleCategory(catId) {
        return new Promise(function (resolve, reject) {
            const categories = `SELECT * FROM category WHERE id='${catId}'`;
            connection.query(categories, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(result[0]);
                }
            });
        });
    }

    deleteCategory(catId) {
        return new Promise(function (resolve, reject) {
            const categories = `DELETE FROM category WHERE id='${catId}'`;
            connection.query(categories, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    updateCategory(title, parentId, categoryId) {
        return new Promise(function (resolve, reject) {
            const categories = `UPDATE category SET title='${title}', parent_id='${parentId}' WHERE id='${categoryId}'`;
            connection.query(categories, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        })
    }

    getAllProduct(user) {
        return new Promise(function (resolve, reject) {
            const product = `SELECT * FROM products`;
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

    updateProductStatus(status, productId) {
        return new Promise(function (resolve, reject) {
            const product = `UPDATE products SET status='${status}' WHERE id='${productId}'`;
            connection.query(product, function (error, result) {
                if (error) {
                    reject(error);
                } else {
                    resolve(true);
                }
            });
        });
    }
    
    getSelledProductsByUserId(userId) {
        return new Promise(function (resolve, reject) {
            const product = `SELECT P.*,O.*, P.id AS product_id, O.id AS order_id, C.title AS category_title FROM products AS P INNER JOIN orders AS O ON P.id=O.product_id INNER JOIN category AS C ON C.id=P.category WHERE P.userId='${userId}'`;
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

module.exports = new CategoryModel();