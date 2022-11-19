const joi = require('joi');

class AdminValidation {
    constructor() { }

    createNewCategoryValidation(req) {
        let valResponse = {
            status: 'Success',
            message: null
        };
        console.log("req", req.body);
        const registerSchema = joi.object({
            title: joi.string().required(),
            parent: joi.string().allow(''),
        });
        let response = registerSchema.validate(req.body);
        console.log("response", response);
        if (response && response.error && response.error.details) {
            console.log(response.error.details);
            console.log("response.error.details[0].message", response.error.details[0].message);
            valResponse.status = 'Error';
            valResponse.message = response.error.details[0].message;
        }
        return valResponse;
    }
}
module.exports = new AdminValidation();