const joi = require('joi');

class UserValidation {
    constructor() { }

    registerValidation(req) {
        let valResponse = {
            status: 'Success',
            message: null
        };
        console.log('req', req.body);
        const registerSchema = joi.object({
            firstName: joi.string().required().label('First Name'),
            lastName: joi.string().required().label('Last Name'),
            contact: joi.number().required().label('Contact No'),
            password: joi.string().required().label('Password'),
            address: joi.string().required().label('Address'),
            emailId: joi.string().email().required().label('Email Id'),
        });
        let response = registerSchema.validate(req.body);
        console.log('response', response);
        if (response && response.error && response.error.details) {
            console.log(response.error.details);
            console.log("response.error.details[0].message", response.error.details[0].message);
            valResponse.status = 'Error';
            valResponse.message = response.error.details[0].message;
        }
        return valResponse;
    }

    productValidation(req) {
        let valResponse = {
            status: 'Success',
            message: null
        };
        console.log('req::::', req);
        const registerSchema = joi.object({
            title: joi.string().required().label('Title'),
            description: joi.string().required().label('Description'),
            price: joi.number().required().label('Price'),
            category: joi.string().required().label('Category')
        });
        let response = registerSchema.validate(req);
        console.log('response', response);
        if (response && response.error && response.error.details) {
            console.log(response.error.details);
            console.log("response.error.details[0].message", response.error.details[0].message);
            valResponse.status = 'Error';
            valResponse.message = response.error.details[0].message;
        }
        return valResponse;
    }
    
    placeOrderValidation(req) {
        let valResponse = {
            status: 'Success',
            message: null
        };
        console.log('req::::', req);
        const registerSchema = joi.object({
            fullName: joi.string().required(),
            email: joi.string().email().required(),
            contact: joi.number().required(),
            shippingAddress: joi.string().required(),
            shippingPincode: joi.number().required(),
            billingAddress: joi.string().required(),
            billingPincode: joi.number().required(),
            productId: joi.number().required(),
            totalAmount: joi.number().required(),
            paymentMethod: joi.string().required(),
        });
        let response = registerSchema.validate(req);
        console.log('response', response);
        if (response && response.error && response.error.details) {
            console.log(response.error.details);
            console.log("response.error.details[0].message", response.error.details[0].message);
            valResponse.status = 'Error';
            valResponse.message = response.error.details[0].message;
        }
        return valResponse;
    }
}

module.exports = new UserValidation();