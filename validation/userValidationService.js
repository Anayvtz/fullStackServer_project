const { loginValidationWithJoi, userRegisterValidationWithJoi } = require("./joi/userJoiValidation");


const validateUserRegistration = (user) => {

    const { error } = userRegisterValidationWithJoi(user);
    if (error) return error.details[0].message;
    return "";

};

const validateUserLogin = (user) => {

    const { error } = loginValidationWithJoi(user);
    if (error) return error.details[0].message;
    return "";

};

module.exports = { validateUserRegistration, validateUserLogin };

