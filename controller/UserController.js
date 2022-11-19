const UserValidation = require('../validation/UserValidation');
const userServices = require('../services/UserServices');
const userModel = require('../model/UserModel');
const sha1 = require('sha1');
const CategoryModel = require('../model/CategoryModel');

class UserController {
    constructor() { }


    async Homepage(req, res) {
        try {
            let Data = {
                title: "Home Page",
                pageName: "homepage",
                isUserLoggedIn: false,
                userdata: [],
                products: [],
            };
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
                const product = await CategoryModel.getVerifiedProducts(user.id);
                Data.products = product;
            }
            res.render("user/template", Data);

        } catch (error) {
            console.log('error userhome page ::', error);
        }
    }
    
    async selledProductsPage(req, res) {
        try {
            let Data = {
                title: "Selled : Products",
                pageName: "selled-products",
                isUserLoggedIn: false,
                userdata: [],
                products: [],
            };
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
                const product = await CategoryModel.getSelledProductsByUserId(user.id);
                console.log("product", product);
                Data.products = product;
            }
            res.render("user/template", Data);

        } catch (error) {
            console.log('error userhome page ::', error);
        }
    }

    async buyNow(req, res) {
        try {
            let Data = {
                title: "Create Order",
                pageName: "create-order",
                isUserLoggedIn: false,
                userdata: [],
            };
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
                //console.log('user', user);
            }
            const product = await userServices.byProductId(req.query);
            Data.products = product;
            res.render("user/template", Data);

        } catch (error) {
            console.log('error buynow page ::', error);
        }
    }

    async getMyProducts(req, res) {
        try {
            let Data = {
                title: "My Products",
                pageName: "my-products",
                isUserLoggedIn: false,
                userdata: [],
                product: []
            };
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
                console.log('user', user);
                Data.product = await userServices.getMyProducts(user.id);
            }
            res.render("user/template", Data);
        } catch (error) {
            console.log('error getMyProducts page ::', error);
        }
    }
    registerPage(req, res) {
        try {
            let Data = {
                title: "Registration Page",
                pageName: "register",
                userdata: [],
                status: '',
                message: '',
                userData: '',
                isUserLoggedIn: false
            };

            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
                //console.log('user', user);
            }
            if (req.cookies && req.cookies.userData) {
                console.log('req.cookies.userData', req.cookies.userData);
                Data.userData = req.cookies.userData;
                res.clearCookie("userData");
            }
            if (req.session.status && req.session.message) {
                Data.status = req.session.status;
                Data.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            res.render("user/template", Data);
        } catch (error) {
            console.log('error registerpage ::', error);
        }
    }

    async insertUser(req, res) {
        try {
            let validate = await UserValidation.registerValidation(req);
            console.log('validate', validate);
            let userData = req.body;
            res.cookie("userData", userData);
            console.log('userData', userData);
            if (validate && validate.status && validate.status == 'Error') {
                req.session.status = "Error";
                req.session.message = validate.message;
                res.redirect('/register');
                return false;
            }
            await userServices.insertUser(req);
            res.redirect('/login');
        } catch (error) {
            console.log('insert user error :::', error);
        }
    }
    loginPage(req, res) {
        try {
            let Data = {
                title: "Login Page",
                pageName: "login",
                status: '',
                message: '',
                isUserLoggedIn: false,
                userdata: [],
            }

            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
            }
            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                Data.userdata = user;
                Data.isUserLoggedIn = true;
            }
            if (req.session.status && req.session.message) {
                Data.status = req.session.status;
                Data.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            res.render("user/template", Data);
        } catch (error) {
            console.log('error login page ::', error);
        }
    }

    async authentication(req, res) {
        try {
            //console.log('req.body authentication', req.body);
            let email = req.body.email;
            //console.log('email', email);
            let password = req.body.password;
            let encryptPassword = sha1(password);
            //console.log('encryptPassword', encryptPassword);

            const getuser = await userServices.getUserByEmail(email);
            let user = getuser[0];
            //console.log('user ', user);
            if (user) {
                //console.log('user Data found');
                if (user.password == encryptPassword) {
                    res.cookie('user', user);
                    res.redirect('/product');
                } else {
                    req.session.status = 'Error';
                    req.session.message = 'Incorrect password'
                    res.redirect('/login');
                };
            } else {
                console.log('user data not found');
                req.session.status = 'Error';
                req.session.message = 'Invalid Email';
                res.redirect('/login');
            };

        } catch (error) {
            console.log('error', error);
        };
    }

    async productPage(req, res) {
        try {
            let pageData = {
                title: "Product Page",
                pageName: "product",
                userdata: [],
                status: '',
                message: '',
                userData: '',
                isUserLoggedIn: false
            };

            if (req.cookies && req.cookies.user) {
                const user = req.cookies.user;
                pageData.userdata = user;
                pageData.isUserLoggedIn = true;
                //console.log('user', user);
            }
            if (req.cookies && req.cookies.userData) {
                console.log('req.cookies.userData', req.cookies.userData);
                pageData.userData = req.cookies.userData;
                res.clearCookie("userData");
            }
            if (req.session.status && req.session.message) {
                pageData.status = req.session.status;
                pageData.message = req.session.message;
                delete req.session.status, req.session.message;
            }
            let catData = await userModel.allCategories();
            pageData.Data = catData;
            //console.log("sell product", pageData);
            res.render("user/template", pageData);
        } catch (error) {
            console.log('error productPage ::', error);
        }
    }
    async insertProduct(req, res) {
        try {
            //console.log("req.body insertProductController", req.body);
            let validate = await UserValidation.productValidation(req.body);
            //console.log('validate', validate);
            let userData = req.body;
            res.cookie("userData", userData);
            //console.log('userData', userData);
            if (validate && validate.status && validate.status == 'Error') {
                req.session.status = "Error";
                req.session.message = validate.message;
                res.redirect('/product');
                return false;
            }
            if (req.cookies && req.cookies.user) {
                //console.log("reqdatatatatatat", req.body);
                //console.log('insertUSERid', req.cookies.user.id);
                let data = req.cookies.user.id;
                await userServices.insertProduct(req.body, data);
                res.redirect('/');
            }
        } catch (error) {
            console.log('insert product error :::', error);
        }
    }

    async placeOrder(req, res) {
        try {
            console.log("req.body placeOrder", req.body);
            let validate = await UserValidation.placeOrderValidation(req.body);
            //console.log('validate', validate);
            let userData = req.body;
            res.cookie("userData", userData);
            //console.log('userData', userData);
            if (validate && validate.status && validate.status == 'Error') {
                req.session.status = "Error";
                req.session.message = validate.message;
                res.redirect('/product');
                return false;
            }
            if (req.cookies && req.cookies.user) {
                //console.log("reqdatatatatatat", req.body);
                //console.log('insertUSERid', req.cookies.user.id);
                let userId = req.cookies.user.id;
                await userServices.placeOrder(req.body, userId);
                res.redirect('/');
            }
        } catch (error) {
            console.log('insert product error :::', error);
        }
    }

    logout(req, res) {
        res.clearCookie('user');
        res.redirect('/');
    };
}


module.exports = new UserController()